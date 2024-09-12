import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '@module/users/dto/create-user.dto';
import { UpdateUserDto } from '@module/users/dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '@module/users/schemas/user.schema';
import { Model } from 'mongoose';
import { HashPassword } from '@/util/helper';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private usersModel: Model<User>) { }
  EmailExist = async (email: string) => {
    const user = await this.usersModel.exists({email:email})
    if (user){
      return true;
    }else{
      return false;
    }
  }
  async create(createUserDto: CreateUserDto) {
    const { name, email, password, phone, address, image } = createUserDto
    const isExist=await this.EmailExist(email)
    if(isExist){
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

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
