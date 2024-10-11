
import { Questions } from '@/modules/question/schemas/question.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type QuizzDocument = HydratedDocument<Quizz>;

@Schema()
export class Quizz {
  @Prop()
  name: string

  @Prop()
  description: string;

  @Prop()
  id: string

  @Prop()
  image: string

  @Prop()
  level: string

  @Prop([Questions])
  questions: Questions[]
}

export const QuizzSchema = SchemaFactory.createForClass(Quizz);