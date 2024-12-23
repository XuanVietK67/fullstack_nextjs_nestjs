import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from './schemas/student.schemas';
import { User, UserSchema } from '../users/schemas/user.schema';
import { Quizz, QuizzSchema } from '../quizzs/schemas/quizz.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Student.name, schema: StudentSchema },
    { name: User.name, schema: UserSchema },
    { name: Quizz.name, schema: QuizzSchema }
  ])],
  controllers: [StudentsController],
  providers: [StudentsService],
  exports: [StudentsService]
})
export class StudentsModule { }



