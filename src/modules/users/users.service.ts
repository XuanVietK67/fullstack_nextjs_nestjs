import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '@module/users/dto/create-user.dto';
import { UpdateUserDto } from '@module/users/dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '@module/users/schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { HashPassword } from '@/util/helper';
import aqp from 'api-query-params';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { changePassword, CreateRegisterUserDto, createResendMailDto, CreateVerifyUserDto } from '@/auth/schemas/create-auth.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { Admin } from '@module/admin/schemas/admin.schema';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private usersModel: Model<User>,
    @InjectModel(Admin.name) private adminsModel: Model<Admin>,
    private readonly mailerService: MailerService,
  ) { }
  EmailExist = async (email: string) => {
    const user = await this.usersModel.exists({ email: email })
    if (user) {
      return true;
    } else {
      return false;
    }
  }
  async create(createUserDto: CreateUserDto) {
    const { name, email, password, phone, address, image } = createUserDto
    const isExist = await this.EmailExist(email)
    if (isExist) {
      throw new BadRequestException("Email already exists")
    }
    //hash password
    const hashPassword = await HashPassword(password)
    const user = await this.usersModel.create({
      name, email, password: hashPassword, phone, address, image
    })
    return {
      _id: user._id
    }
  }

  async findAll(query: string, current: number, pageSize: number) {
    const { filter, sort } = aqp(query)
    // clear filter
    if (filter.current) delete filter.current
    if (filter.pageSize) delete filter.pageSize
    //validate current and pageSize 
    if (!current) current = 1;
    if (!pageSize) pageSize = 10; 


    const totalItems = (await this.usersModel.find(filter)).length
    const skipp = (current - 1) * pageSize
    const totalPage = Math.ceil(totalItems / pageSize)

    const result = await this.usersModel
      .find(filter)
      .limit(pageSize)
      .skip(skipp)
      .select("-password")
      .sort(sort as any)
    return { 
      pageInfo: {
        totalPage,
        totalItems,
        currentPage:current ,
        pageSize
      },
      result
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
  async findUserByEmail(email: string) {
    return await this.usersModel.findOne({ email })
  }
  async update(updateUserDto: UpdateUserDto) {
    return await this.usersModel.updateOne(
      { _id: updateUserDto._id }, { ...updateUserDto }
    )
  }

  async remove(_id: string) {
    if (mongoose.isValidObjectId(_id)) {
      return await this.usersModel.deleteOne({ _id })
    } else {
      throw new BadRequestException("Invalid id")
    }
  }
  // hash password, create user
  async CreateRegisterUser(registerDto: CreateRegisterUserDto) {
    const { email, username, password, image } = registerDto
    const isExist = await this.EmailExist(email)
    if (isExist) {
      throw new BadRequestException("Email already exists")
    }
    const hashPassword = await HashPassword(password)
    const codeId=uuidv4()

    await this.adminsModel.create({
      email,name: username, password: hashPassword, code_id: codeId, code_expired: dayjs().add(1,'day'), image
    })
    const user = await this.usersModel.create({
      email, name: username, password: hashPassword,role:'admin',image,
      code_id: codeId,
      code_expired: dayjs().add(1, 'day'),
      is_active: true
    })
    return {
      email: user.email,
      _id: user._id
    }
  }
  async CreateVerifyUser(VerifyData: CreateVerifyUserDto){
    const user=await this.usersModel.findOne({
      email: VerifyData.email,
      code_id: VerifyData.code
    })
    if(user){
      await this.usersModel.updateOne({email: VerifyData.email},{is_active:true})
      await this.adminsModel.updateOne({email: VerifyData.email},{is_active: true})
      return{
        message: "Active account successfully"
      }
    }
    else{
      throw new BadRequestException('Code is not correct or expired')
    }
  }
  async ResendMail(ResendData: createResendMailDto){
    const user=await this.usersModel.findOne({
      email: ResendData.username
    })
    if(!user){
      throw new BadRequestException("Email is not exists")
    }
    const codeId=uuidv4()
    await this.usersModel.updateOne({email:ResendData.username},{code_id:codeId})
    this.mailerService.sendMail({
      to: user.email, // list of receivers
      subject: 'Active your account at XuanVietDev', // Subject line
      text: 'welcome', // plaintext body
      template: "register",
      context: {
        name: user.name,
        activationCode: codeId
      }
    })
    return{
      message:'Send Email success'
    }
  }
  async changePassword(passwordData: changePassword){
    const newPassword= await HashPassword(passwordData.password)
    await this.usersModel.updateOne({email: passwordData.email},{password:newPassword})
    return{
      message:'Change password successfully'
    }
  }
}
