import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { AnswerQuestionDto } from '../dto/create-question.dto';

export type QuestionsDocument = HydratedDocument<Questions>;

@Schema()
export class Questions {
  @Prop()
  description: string;
  @Prop([AnswerQuestionDto])
  answers: AnswerQuestionDto[]
  @Prop()
  image:string
}

export const QuestionsSchema = SchemaFactory.createForClass(Questions);