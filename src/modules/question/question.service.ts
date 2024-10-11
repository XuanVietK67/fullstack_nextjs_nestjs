import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AnswerQuestionDto, CreateQuestionDto } from './dto/create-question.dto';
import { DeleteQuestionDto, UpdateAnswer, UpdateQuestionDto } from '@module/question/dto/update-question.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Questions } from '@module/question/schemas/question.schema';
import { Model } from 'mongoose';
import { QuizzsService } from '../quizzs/quizzs.service';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Questions.name) private QuestionsModel: Model<Questions>,
  ) { }
  async create(createQuestionDto: CreateQuestionDto) {
    const { quizzId, description, questionId } = createQuestionDto
    const res = await this.QuestionsModel.create({
      description, quizzId, questionId
    })
    return res;
  }
  async createAnswer(createAnswerDto: AnswerQuestionDto) {
    const { quizzId, questionId, description, correctAnswer } = createAnswerDto
    const question = await this.QuestionsModel.findOne({
      quizzId, questionId
    })
    const id = question.answers.length + 1
    const answer = [...question.answers, { id, description, correctAnswer }]
    const res = await this.QuestionsModel.updateOne(
      { questionId, quizzId }, { answers: answer }
    )
    return {
      res, answer
    }
  }
  async updateQuestion(updateQuestion: UpdateQuestionDto) {
    const { questionId, quizzId, description } = updateQuestion
    const res = await this.QuestionsModel.updateOne(
      { questionId, quizzId }, { description }
    )
    const question = await this.QuestionsModel.findOne({
      quizzId, questionId
    })
    return {
      res, question
    }
  }
  async deleteQuestion(deleteQuestion: DeleteQuestionDto) {
    const { questionId, quizzId } = deleteQuestion
    await this.QuestionsModel.deleteOne({
      quizzId, questionId
    })
  }
  async updateAnswer(updateAnswerData: UpdateAnswer) {
    const { questionId, quizzId, answerId, description, correctAnswer } = updateAnswerData
    const question = await this.QuestionsModel.findOne({
      questionId, quizzId
    })
    const answer = [...question.answers]
    if (description) {
      answer[+answerId - 1].description = description
    }
    if (correctAnswer) {
      answer[+answerId - 1].correctAnswer = correctAnswer
    }
    const res = await this.QuestionsModel.updateOne(
      { questionId, quizzId }, { answers: answer }
    )
    return {
      res, answer
    }
  }
  findAll() {
    return `This action returns all question`;
  }

  findOne(id: number) {
    return `This action returns a #${id} question`;
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
