import { forwardRef, Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Questions, QuestionsSchema } from '@module/question/schemas/question.schema';
import { Quizz, QuizzSchema } from '../quizzs/schemas/quizz.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Questions.name, schema: QuestionsSchema },
      { name: Quizz.name, schema: QuizzSchema },
    ]),
  ],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {
  constructor(private questionService: QuestionService) { }
}
