import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestionService } from './question.service';
import { AnswerQuestionDto, CreateQuestionDto, DataAddAnswer } from './dto/create-question.dto';
import { DeleteQuestionDto, UpdateAnswer, UpdateQuestionDto } from '@module/question/dto/update-question.dto';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) { }

  // @Post('delete')
  // deleteQuestionDto(@Body() deleteQuestionDto: DeleteQuestionDto){
  //   return this.questionService.deleteQuestion(deleteQuestionDto)
  // }


  @Get()
  findAll() {
    return this.questionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
    return this.questionService.update(+id, updateQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionService.remove(+id);
  }
}
