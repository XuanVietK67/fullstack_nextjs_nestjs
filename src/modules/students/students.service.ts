import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { AssignQuiz, DataUpdateStudent } from './dto/update-student.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from './schemas/student.schemas';
import { User } from '../users/schemas/user.schema';
import { HashPassword } from '@/util/helper';
import { Quizz } from '../quizzs/schemas/quizz.schema';
import { In } from 'typeorm';
import aqp from 'api-query-params';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student.name) private StudentModel: Model<Student>,
    @InjectModel(User.name) private UserModel: Model<User>,
    @InjectModel(User.name) private QuizzModel: Model<Quizz>
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

  async findAll() {
    // return `This action returns all students`;
    const students = await this.StudentModel.find()
    return students
  }

  async receive(studentId: string, quizId: string) {
    const student = await this.StudentModel.findOne({ _id: studentId })
    if (student.testsAssigned.includes(quizId)) {
      await this.StudentModel.updateOne(
        { _id: studentId }, { testsAssigned: student.testsAssigned.filter((quiz) => quiz != quizId) }
      )
    }
    else {
      await this.StudentModel.updateOne(
        { _id: studentId }, { testsAssigned: [...student.testsAssigned, quizId] }
      )
    }
  }

  async findSomeStudent(query: string, current: number, pageSize: number) {
    const { filter, sort } = aqp(query)
    // clear filter
    if (filter.current) delete filter.current
    if (filter.pageSize) delete filter.pageSize
    //validate current and pageSize 
    if (!current) current = 1;
    if (!pageSize) pageSize = 10;


    const totalItems = (await this.StudentModel.find(filter)).length
    const skipp = (current - 1) * pageSize
    const totalPage = Math.ceil(totalItems / pageSize)

    const result = await this.StudentModel
      .find(filter)
      .limit(pageSize)
      .skip(skipp)
      .select("-password")
      .sort(sort as any)
    return {
      pageInfo: {
        totalPage,
        totalItems,
        currentPage: current,
        pageSize,
        from: (current - 1) * pageSize + 1,
        to: totalItems - (current - 1) * pageSize > pageSize ? current * pageSize : totalItems
      },
      result
    }
  }


  async findOne(_id: string) {
    const student = await this.StudentModel.findOne({ _id })
    return student
  }

  async update(_id: string, updateStudentDto: DataUpdateStudent) {
    const { name, image } = updateStudentDto
    await this.StudentModel.updateOne(
      { _id }, { name, image }
    )

    const newStudent = await this.StudentModel.findOne({ _id })
    await this.UserModel.updateOne({ email: newStudent.email }, { name, image })
    return newStudent
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }

  async assign(assignData: AssignQuiz) {
    const { quizsId, studentsId } = assignData
    console.log("check quizsId, studentsId: ", quizsId, studentsId)
    quizsId.forEach(async (_id: string) => {
      console.log("check q: ", _id)
      const quiz = await this.QuizzModel.findOne({
        _id
      })
      console.log("check quiz: ", quiz)
      const quizAssign = { _id, image: quiz.image, name: quiz.name, description: quiz.description }
      studentsId.forEach(async (studentId) => {
        const student = await this.StudentModel.findOne({
          _id: studentId
        })

        await this.StudentModel.updateOne(
          { _id: studentId }, { testsAssigned: [...student.testsAssigned, quizAssign] }
        )
      })
    })
    return
  }
}
