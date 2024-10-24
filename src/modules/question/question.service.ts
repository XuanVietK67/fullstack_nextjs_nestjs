import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AnswerQuestionDto, CreateQuestionDto, DataAddAnswer } from './dto/create-question.dto';
import { DeleteQuestionDto, UpdateAnswer, UpdateQuestionDto } from '@module/question/dto/update-question.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Questions } from '@module/question/schemas/question.schema';
import { Model } from 'mongoose';
import { Quizz } from '@module/quizzs/schemas/quizz.schema';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Questions.name) private QuestionsModel: Model<Questions>,
    @InjectModel(Quizz.name) private QuizzModel: Model<Quizz>,
  ) { }
  // async deleteQuestion(deleteQuestion: DeleteQuestionDto) {
  //   const { questionId, quizzId } = deleteQuestion
  //   await this.QuestionsModel.deleteOne({
  //     quizzId, questionId
  //   })
  // }
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
