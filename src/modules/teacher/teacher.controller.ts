import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacher } from './dto/update-teacher.dto';

@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post()
  create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teacherService.create(createTeacherDto);
  }

  @Get()
  findAll() {
    return this.teacherService.findAll();
  }

  @Get('getSome')
  async findSome(
    @Query() query: string,
    @Query("current") current: string,
    @Query("pageSize") pageSize: string
  ) {
    return this.teacherService.findSomeTeacher(query, +current, +pageSize);
  }


  @Get('detail')
  findOne(@Query('_id') _id: string) {
    return this.teacherService.findOne(_id);
  }

  @Patch('update')
  update(@Query('_id') _id: string, @Body() updateTeacherDto: UpdateTeacher) {
    return this.teacherService.update(_id, updateTeacherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teacherService.remove(+id);
  }
}
