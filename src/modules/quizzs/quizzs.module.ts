import { forwardRef, Module } from '@nestjs/common';
import { QuizzsService } from './quizzs.service';
import { QuizzsController } from './quizzs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Quizz, QuizzSchema } from '@module/quizzs/schemas/quizz.schema';
import { Teacher, TeacherSchema } from '../teacher/schemas/teacher.schema';
import { User, UserSchema } from '../users/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Quizz.name, schema: QuizzSchema },
      {name: Teacher.name, schema:TeacherSchema},
      {name: User.name, schema:UserSchema}
    ]),
  ],
  controllers: [QuizzsController],
  providers: [QuizzsService],
})
export class QuizzsModule {}
