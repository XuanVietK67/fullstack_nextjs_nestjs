import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateQuizzDto } from './dto/create-quizz.dto';
import { DataGetQuestionsDto, Score, UpdateQuestion, UpdateQuizzDto } from './dto/update-quizz.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quizz } from '@module/quizzs/schemas/quizz.schema';
import { Questions } from '../question/schemas/question.schema';
import { UpdateQuestionDto } from '../question/dto/update-question.dto';
// import aqp from 'api-query-params';

@Injectable()
export class QuizzsService {
  constructor(
    @InjectModel(Quizz.name) private QuizzModel: Model<Quizz>,
    @InjectModel(Questions.name) private QuestionModel: Model<Questions>,
  ) { }
  async create(createQuizzDto: CreateQuizzDto) {
    const { name, description, level, image, teacherId } = createQuizzDto
    const questions = [{ description: "", answers: [{ description: '', correctAnswer: false }] }]
    const res = await this.QuizzModel.create({
      name, description, level, image, questions: questions, teacherId
    })
    return res
  }
  async update(DataUpdate: UpdateQuizzDto) {
    const { name, description, level, image, _id } = DataUpdate
    const res = await this.QuizzModel.updateOne(
      { _id }, { name, description, image, level }
    )
    return res
  }
  async updateQuestion(DataUpdateQuestion: UpdateQuestion) {
    const { _id, question, index } = DataUpdateQuestion
    const quiz = await this.QuizzModel.findOne({ _id })
    let questions = quiz.questions
    questions[index] = question
    const res = await this.QuizzModel.updateOne(
      { _id }, { questions: questions }
    )
    return res
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
  async findQuizNoAnswer(_id: string) {
    const res = await this.QuizzModel.findOne({
      _id
    })
    let q = res
    q.questions.forEach((question: Questions, index: number) => {
      question.answers.forEach((answer: any) => {
        answer.correctAnswer = false
      })
    })
    return q
  }
  async score(answers: Score) {
    const { result, _id } = answers
    const quiz =await this.QuizzModel.findOne({
      _id
    }) 
    let questions=quiz.questions
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
      correctAnswers[index]=correct
    })
    let point=0
    result.forEach((items: string,index: number)=>{
      // console.log(`${items} - ${correctAnswers[index]}`)
      if(items==correctAnswers[index]){
        point=point+1
      }
    })
    return point
  }

  async getQuiz(teacherId: string){
    const quizs=await this.QuizzModel.find({
      teacherId
    })
    return quizs
  }
}
