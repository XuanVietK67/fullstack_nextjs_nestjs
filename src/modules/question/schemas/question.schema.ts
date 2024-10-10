import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type QuestionsDocument = HydratedDocument<Questions>;

@Schema()
export class Questions {
  @Prop()
  quizzId: string;

  @Prop()
  description: string;

  @Prop([String])
  answers: string[];
}

export const QuestionsSchema = SchemaFactory.createForClass(Questions);