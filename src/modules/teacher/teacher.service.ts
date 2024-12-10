import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Teacher } from './schemas/teacher.schema';
import { Model } from 'mongoose';
import { User } from '../users/schemas/user.schema';
import { HashPassword } from '@/util/helper';
import aqp from 'api-query-params';
import { UpdateTeacher } from './dto/update-teacher.dto';

@Injectable()
export class TeacherService {
  constructor(
    @InjectModel(Teacher.name) private TeacherModel: Model<Teacher>,
    @InjectModel(User.name) private UserModel: Model<User>
  ) {}


  async create(createTeacherDto: CreateTeacherDto) {
    const {email, password, name, image, phone, address}=createTeacherDto
    const teacher= await this.TeacherModel.findOne({
      email
    })
    if(teacher){
      throw new BadRequestException(`${email} already exists`)
    }
    const hashPassword = await HashPassword(password)
    await this.UserModel.create({
      email, password: hashPassword,name, phone, address, image, is_active: true, role: 'teacher'
    })
    const res= await this.TeacherModel.create({
      email,password: hashPassword,name,image, role:'teacher'
    })
    return res
  }


  async findSomeTeacher(query: string, current: number, pageSize: number) {
    const { filter, sort } = aqp(query)
    // clear filter
    if (filter.current) delete filter.current
    if (filter.pageSize) delete filter.pageSize
    //validate current and pageSize 
    if (!current) current = 1;
    if (!pageSize) pageSize = 10; 


    const totalItems = (await this.TeacherModel.find(filter)).length
    const skipp = (current - 1) * pageSize
    const totalPage = Math.ceil(totalItems / pageSize)

    const result = await this.TeacherModel
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

  findAll() {
    return `This action returns all teacher`;
  }

  async findOne(_id: string) {
    const teacher=await this.TeacherModel.findOne({
      _id
    })
    return teacher
  }

  async update(_id: string, updateTeacherDto: UpdateTeacher) {
    const {name, image}=updateTeacherDto
    await this.TeacherModel.updateOne(
      {_id}, {name, image}
    )
    const newTeacher=await this.TeacherModel.findOne({_id})

    await this.UserModel.updateOne({email: newTeacher.email},{name, image})
    return newTeacher
  }

  remove(id: number) {
    return `This action removes a #${id} teacher`;
  }
}
