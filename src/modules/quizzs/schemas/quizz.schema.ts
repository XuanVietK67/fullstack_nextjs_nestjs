// export class Quizz {}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type QuizzDocument = HydratedDocument<Quizz>;

@Schema()
export class Quizz {
  @Prop()
  description: string;

  @Prop()
  id: string

  @Prop()
  image: string;
}

export const QuizzSchema = SchemaFactory.createForClass(Quizz);