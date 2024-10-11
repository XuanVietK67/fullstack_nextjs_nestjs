import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestionService } from './question.service';
import { AnswerQuestionDto, CreateQuestionDto } from './dto/create-question.dto';
import { DeleteQuestionDto, UpdateAnswer, UpdateQuestionDto } from '@module/question/dto/update-question.dto';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.create(createQuestionDto);
  }
  @Post('answer')
  createAnswer(@Body() createAnswerDto: AnswerQuestionDto) {
    return this.questionService.createAnswer(createAnswerDto);
  }
  @Post('update')
  updateQuestion(@Body() updateQuestionDto: UpdateQuestionDto) {
    return this.questionService.updateQuestion(updateQuestionDto);
  }
  @Post('delete')
  deleteQuestionDto(@Body() deleteQuestionDto: DeleteQuestionDto){
    return this.questionService.deleteQuestion(deleteQuestionDto)
  }

  @Post('answer/update')
  updateAnswer(@Body() updateAnswerDto: UpdateAnswer) {
    return this.questionService.updateAnswer(updateAnswerDto);
  }

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
