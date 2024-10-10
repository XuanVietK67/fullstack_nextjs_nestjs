import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { AnswerQuestionDto } from '../dto/create-question.dto';

export type QuestionsDocument = HydratedDocument<Questions>;

@Schema()
export class Questions {
  @Prop()
  quizzId: string;
  @Prop()
  description: string;
  @Prop()
  questionId: string
  @Prop([AnswerQuestionDto])
  answers: AnswerQuestionDto[]
  @Prop()
  correctAnswer: string
}

export const QuestionsSchema = SchemaFactory.createForClass(Questions);