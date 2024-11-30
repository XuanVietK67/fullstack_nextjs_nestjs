import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Teacher, TeacherSchema } from './schemas/teacher.schema';
import { User, UserSchema } from '../users/schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Teacher.name, schema: TeacherSchema },
    { name: User.name, schema: UserSchema }
  ])],
  controllers: [TeacherController],
  providers: [TeacherService],
})
export class TeacherModule {}
