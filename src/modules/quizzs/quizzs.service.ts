import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateQuizzDto } from './dto/create-quizz.dto';
import { DataGetQuestionsDto, Score, UpdateQuestion, UpdateQuizzDto } from './dto/update-quizz.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quizz } from '@module/quizzs/schemas/quizz.schema';
import { Teacher } from '../teacher/schemas/teacher.schema';
import { User } from '../users/schemas/user.schema';
// import aqp from 'api-query-params';

@Injectable()
export class QuizzsService {
  constructor(
    @InjectModel(Quizz.name) private QuizzModel: Model<Quizz>,
    @InjectModel(Teacher.name) private TeacherModel: Model<Teacher>,
    @InjectModel(User.name) private UserModel: Model<User>,
  ) { }
  async create(createQuizzDto: CreateQuizzDto) {
    const { name, description, level, image, teacherId } = createQuizzDto
    const res = await this.QuizzModel.create({
      name, description, level, image, questions: [], teacherId
    })
    const user = await this.UserModel.findOne({ _id: teacherId })
    const teacher = await this.TeacherModel.findOne({ email: user.email })
    await this.TeacherModel.updateOne(
      { email: teacher.email }, { testList: [...teacher.testList, res] }
    )
    return res
  }
  async update(_id: string, DataUpdate: UpdateQuizzDto) {
    const { name, description, level, image, questions } = DataUpdate
    const res = await this.QuizzModel.updateOne(
      { _id }, { name, description, image, level, questions }
    )
    return res
  }


  async updateQuestion(DataUpdateQuestion: UpdateQuestion) {
    const { _id, question, index } = DataUpdateQuestion
    const quiz = await this.QuizzModel.findOne({ _id })
    let questions = quiz.questions
    await this.QuizzModel.updateOne(
      { _id }, { questions }
    )
    const newQuiz = await this.QuizzModel.findOne({ _id })
    return newQuiz
  }



  // async remove(DataDeleteQuizz: UpdateQuizzDto) {
  //   const { id } = DataDeleteQuizz
  //   await this.QuizzModel.deleteOne({
  //     id
  //   })
  // }

  async findAll(current: string, pageSize: string) {
    const skipp = (+current - 1) * (+pageSize)
    const res = await this.QuizzModel
      .find()
      .limit(+pageSize)
      .skip(skipp)
    const quizzs = await this.QuizzModel.find()
    const totalItems = quizzs.length
    const info = {
      totalItems, current, pageSize
    }
    return {
      res, info
    }
  }

  async findAllQuizz() {
    const res = await this.QuizzModel.find()
    const numberOfQuizz = res.length
    return {
      res, numberOfQuizz
    }
  }


  async findOne(_id: string) {
    const res = await this.QuizzModel.findOne({
      _id
    })
    return res
  }
  async score(answers: Score) {
    const { result, _id } = answers
    const quiz = await this.QuizzModel.findOne({
      _id
    })
    let questions = quiz.questions
    // console.log(questions)
    let correctAnswers = []
    questions.forEach((items: any, index: number) => {
      let answer = items.answers
      // console.log(answer)
      let correct = ""
      answer.forEach((ans: any, answerIndex: number) => {
        if (ans.correctAnswer === 'true') {
          correct = correct + answerIndex
        }
      })
      correctAnswers[index] = correct
    })
    let point = 0
    result.forEach((items: string, index: number) => {
      // console.log(`${items} - ${correctAnswers[index]}`)
      if (items == correctAnswers[index]) {
        point = point + 1
      }
    })
    return point
  }

  async getQuiz(teacherId: string, current: number, pageSize: number) {
    const quizs = await this.QuizzModel.find({
      teacherId
    })
    const result = quizs.slice((current - 1) * pageSize, current * pageSize)
    const pageInfo = {
      totalItems: quizs.length,
      totalPage: Math.ceil(quizs.length / pageSize),
      current,
      pageSize,
      from: (current - 1) * pageSize + 1,
      to: quizs.length - (current - 1) * pageSize > pageSize ? current * pageSize : quizs.length
    }
    return {
      result, pageInfo
    }
  }
}
