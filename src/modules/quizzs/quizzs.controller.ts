import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuizzsService } from './quizzs.service';
import { CreateQuizzDto } from './dto/create-quizz.dto';
import { DataGetQuestionsDto, UpdateQuizzDto } from './dto/update-quizz.dto';

@Controller('quizzs')
export class QuizzsController {
  constructor(private readonly quizzsService: QuizzsService) {}

  @Post()
  create(@Body() createQuizzDto: CreateQuizzDto) {
    return this.quizzsService.create(createQuizzDto);
  }

  @Get('getQuestion')
  getQuestion(@Body() DataGetQuestion: DataGetQuestionsDto) {
    return this.quizzsService.getQuestionByQuizzId(DataGetQuestion);
  }
  @Patch('update')
  updateQuizz(@Body() DataUpdateQuizz: UpdateQuizzDto){
    return this.quizzsService.update(DataUpdateQuizz)
  }

  @Delete('remove')
  remove(@Body() DataDeleteQuizz: UpdateQuizzDto) {
    return this.quizzsService.remove(DataDeleteQuizz);
  }
  @Get()
  findAll() {
    return this.quizzsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizzsService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateQuizzDto: UpdateQuizzDto) {
  //   return this.quizzsService.update(+id, updateQuizzDto);
  // }

  
}
