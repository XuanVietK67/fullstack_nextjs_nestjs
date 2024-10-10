import { Injectable } from '@nestjs/common';
import { AnswerQuestionDto, CreateQuestionDto } from './dto/create-question.dto';
import { DeleteQuestionDto, UpdateQuestionDto } from './dto/update-question.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Questions } from '@module/question/schemas/question.schema';
import { Model } from 'mongoose';

@Injectable()
export class QuestionService {
  constructor(@InjectModel(Questions.name) private QuestionsModel: Model<Questions>) { }
  async create(createQuestionDto: CreateQuestionDto) {
    const { quizzId, description, questionId } = createQuestionDto
    const res = await this.QuestionsModel.create({
      description, quizzId, questionId
    })
    return res;
  }
  async createAnswer(createAnswerDto: AnswerQuestionDto) {
    const { quizzId, questionId, description, correctAnswer } = createAnswerDto
    const question=await this.QuestionsModel.findOne({
      quizzId,questionId
    })
    const id=question.answers.length+1
    const answer=[...question.answers,{id,description,correctAnswer}]
    const res=await this.QuestionsModel.updateOne(
      { questionId, quizzId }, {answers: answer}
    )
    return res
  }
  async updateQuestion(updateQuestion: UpdateQuestionDto){
    const {questionId,quizzId,description}=updateQuestion
    const res=await this.QuestionsModel.updateOne(
      {questionId,quizzId},{description}
    )
    return res
  }
  async deleteQuestion(deleteQuestion: DeleteQuestionDto){
    const {questionId,quizzId}=deleteQuestion
    const res=await this.QuestionsModel.deleteOne({
      quizzId,questionId
    })
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
