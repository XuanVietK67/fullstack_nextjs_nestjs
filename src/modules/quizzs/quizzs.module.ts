import { Module } from '@nestjs/common';
import { QuizzsService } from './quizzs.service';
import { QuizzsController } from './quizzs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Quizz, QuizzSchema } from '@module/quizzs/schemas/quizz.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Quizz.name, schema: QuizzSchema }])],
  controllers: [QuizzsController],
  providers: [QuizzsService],
})
export class QuizzsModule {}
