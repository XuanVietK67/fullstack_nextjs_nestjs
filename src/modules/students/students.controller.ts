import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { AssignQuiz, DataUpdateStudent } from './dto/update-student.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Get()
  findAll() {
    return this.studentsService.findAll();
  }

  @Get('getSome')
  async findSome(
    @Query() query: string,
    @Query("current") current: string,
    @Query("pageSize") pageSize: string
  ) {
    return this.studentsService.findSomeStudent(query, +current, +pageSize);
  }

  @Get('detail')
  findOne(@Query('_id') _id: string) {
    return this.studentsService.findOne(_id);
  }

  @Patch('update')
  update(@Query('_id') _id: string, @Body() updateStudentDto: DataUpdateStudent) {
    return this.studentsService.update(_id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(+id);
  }

  @Post('assign')
  assign(@Body() assignData: AssignQuiz){
    return this.studentsService.assign(assignData)
  }
}
