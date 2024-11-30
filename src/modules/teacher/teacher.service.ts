import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Teacher } from './schemas/teacher.schema';
import { Model } from 'mongoose';
import { User } from '../users/schemas/user.schema';
import { HashPassword } from '@/util/helper';

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

  findAll() {
    return `This action returns all teacher`;
  }

  findOne(id: number) {
    return `This action returns a #${id} teacher`;
  }

  update(id: number, updateTeacherDto: UpdateTeacherDto) {
    return `This action updates a #${id} teacher`;
  }

  remove(id: number) {
    return `This action removes a #${id} teacher`;
  }
}
