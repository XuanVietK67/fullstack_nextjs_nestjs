import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateQuizzDto } from './dto/create-quizz.dto';
import { DataGetQuestionsDto, UpdateQuizzDto } from './dto/update-quizz.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quizz } from '@module/quizzs/schemas/quizz.schema';
import { Questions } from '../question/schemas/question.schema';

@Injectable()
export class QuizzsService {
  constructor(
    @InjectModel(Quizz.name) private QuizzModel: Model<Quizz>,
    @InjectModel(Questions.name) private QuestionModel: Model<Questions>,
  ) { }
  async create(createQuizzDto: CreateQuizzDto) {
    const { name, description, level, image } = createQuizzDto
    const count = await this.QuizzModel.find()
    const res = await this.QuizzModel.create({
      name, description, level, image, id: +count + 1
    })
    return res
  }
  async getQuestionByQuizzId(DataGetQuestion: DataGetQuestionsDto) {
    const { quizzId } = DataGetQuestion
    const questions = await this.QuestionModel.find({
      quizzId
    })
    const res = await this.QuizzModel.updateOne(
      { id: quizzId }, { questions }
    )
    const quizz = await this.QuizzModel.findOne({
      id: quizzId
    })
    return {
      res, quizz
    }
  }
  async update(DataUpdate: UpdateQuizzDto) {
    const { id, name, description, level, image } = DataUpdate
    const res = await this.QuizzModel.updateOne(
      { id }, { name, description, level, image }
    )
    const quizz = await this.QuizzModel.findOne({
      id
    })
    return {
      res, quizz
    }
  }
  async remove(DataDeleteQuizz: UpdateQuizzDto) {
    const {id}=DataDeleteQuizz
    await this.QuizzModel.deleteOne({
      id
    })
  }
  findAll() {
    return `This action returns all quizzs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} quizz`;
  }


}
