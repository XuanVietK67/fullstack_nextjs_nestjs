import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateQuizzDto } from './dto/create-quizz.dto';
import { DataGetQuestionsDto, UpdateQuizzDto } from './dto/update-quizz.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quizz } from '@module/quizzs/schemas/quizz.schema';
import { Questions } from '../question/schemas/question.schema';
// import aqp from 'api-query-params';

@Injectable()
export class QuizzsService {
  constructor(
    @InjectModel(Quizz.name) private QuizzModel: Model<Quizz>,
    @InjectModel(Questions.name) private QuestionModel: Model<Questions>,
  ) { }
  async create(createQuizzDto: CreateQuizzDto) {
    const { name, description, level, image } = createQuizzDto
    const questions = [{description:"", answers: [{description:'',correctAnswer:false}]}]
    const res = await this.QuizzModel.create({
      name, description, level, image, questions: questions
    })
    return res
  }
  async update(DataUpdate: UpdateQuizzDto) {
    const {name, description,level,image,_id,questions}=DataUpdate
    const res=await this.QuizzModel.updateOne(
      {_id},{name,description,image,level,questions}
    )
    return res
  }
  // async remove(DataDeleteQuizz: UpdateQuizzDto) {
  //   const { id } = DataDeleteQuizz
  //   await this.QuizzModel.deleteOne({
  //     id
  //   })
  // }

  async findAll( current: string, pageSize: string) {
    const skipp=(+current-1)*(+pageSize)
    const res=await this.QuizzModel
    .find()
    .limit(+pageSize)
    .skip(skipp)
    const quizzs=await this.QuizzModel.find()
    const totalItems=quizzs.length
    const info={
      totalItems,current,pageSize
    }
    return {
      res, info
    }
  }

  async findAllQuizz(){
    const res= await this.QuizzModel.find()
    const numberOfQuizz=res.length
    return {
      res,numberOfQuizz
    }
  }


  findOne(id: number) {
    return `This action returns a #${id} quizz`;
  }


}
