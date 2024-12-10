import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { QuizzsService } from './quizzs.service';
import { CreateQuizzDto } from '@/modules/quizzs/dto/create-quizz.dto';
import {   Score, UpdateQuestion, UpdateQuizzDto } from '@/modules/quizzs/dto/update-quizz.dto';
import { Public } from '@/auth/decoration/customizePublicAccessToken';

@Controller('quizzs')
export class QuizzsController {
  constructor(private readonly quizzsService: QuizzsService) {}

  @Post()
  create(@Body() createQuizzDto: CreateQuizzDto) {
    return this.quizzsService.create(createQuizzDto);
  }
  @Patch('update')
  updateQuizz(@Body() DataUpdateQuizz: UpdateQuizzDto){
    return this.quizzsService.update(DataUpdateQuizz)
  }

  @Patch('update/question')
  updateQuestion(@Body() DataUpdateQuestion: UpdateQuestion){
    return this.quizzsService.updateQuestion(DataUpdateQuestion)
  }
  @Get()
  @Public()
  findAll(
    @Query('current') current:string,
    @Query('pageSize') pageSize:string,
  ) {
    return this.quizzsService.findAll(current,pageSize);
  }
  @Get('all')
  findAllQuizz() {
    return this.quizzsService.findAllQuizz();
  }
  @Get('getOne')
  findOne(@Query('_id') _id:string,) {
    return this.quizzsService.findOne(_id);
  }
  @Get('getOne/noCorrectAnswer')
  findQuiz(@Query('_id') _id:string,) {
    return this.quizzsService.findQuizNoAnswer(_id);
  }
  @Post('score')
  score(@Body() answers: Score){
    return this.quizzsService.score(answers)
  }

  @Get('byTeacherId')
  getQuiz(@Query('_id') teacherId: string){
    return this.quizzsService.getQuiz(teacherId)
  }
}
