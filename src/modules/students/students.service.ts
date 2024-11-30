import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from './schemas/student.schemas';
import { User } from '../users/schemas/user.schema';
import { HashPassword } from '@/util/helper';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student.name) private StudentModel: Model<Student>,
    @InjectModel(User.name) private UserModel: Model<User>
  ) { }

  async create(createStudentDto: CreateStudentDto) {
    const { email, password, name, image, phone, address } = createStudentDto
    const student = await this.StudentModel.findOne({
      email
    })
    if (student) {
      throw new BadRequestException(`${email} already exists`)
    }
    const hashPassword = await HashPassword(password)
    await this.UserModel.create({
      email, password: hashPassword, name, phone, address, image, is_active: true, is_student: true, role: "student"
    })
    const res = await this.StudentModel.create({
      email, password: hashPassword, name, image, phone, address
    })
    return res
  }

  async findStudentByEmail(email: string) {
    return await this.StudentModel.findOne({
      email
    })
  }

  findAll() {
    return `This action returns all students`;
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
