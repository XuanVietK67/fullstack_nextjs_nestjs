
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Question } from '../dto/create-quizz.dto';

export type QuizzDocument = HydratedDocument<Quizz>;

@Schema()
export class Quizz {
  @Prop()
  name: string

  @Prop()
  description: string;

  @Prop()
  image: string

  @Prop()
  level: string

  @Prop()
  teacherId: string

  @Prop()
  questions: Question[]
}

export const QuizzSchema = SchemaFactory.createForClass(Quizz);