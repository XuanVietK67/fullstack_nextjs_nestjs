import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
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
  @Patch('update')
  updateQuizz(@Body() DataUpdateQuizz: UpdateQuizzDto){
    return this.quizzsService.update(DataUpdateQuizz)
  }
  // @Delete('remove')
  // remove(@Body() DataDeleteQuizz: UpdateQuizzDto) {
  //   return this.quizzsService.remove(DataDeleteQuizz);
  // }
  @Get()
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
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizzsService.findOne(+id);
  }
}
