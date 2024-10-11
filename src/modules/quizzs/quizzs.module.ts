import { forwardRef, Module } from '@nestjs/common';
import { QuizzsService } from './quizzs.service';
import { QuizzsController } from './quizzs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Quizz, QuizzSchema } from '@module/quizzs/schemas/quizz.schema';
import { QuestionModule } from '../question/question.module';
import { Questions, QuestionsSchema } from '../question/schemas/question.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Quizz.name, schema: QuizzSchema },
      {name: Questions.name, schema:QuestionsSchema}
    ]),
  ],
  controllers: [QuizzsController],
  providers: [QuizzsService],
})
export class QuizzsModule {}
