

import { Quizz } from '@/modules/quizzs/schemas/quizz.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type StudentDocument = HydratedDocument<Student>;

@Schema()
export class Student {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({default: 'student'})
  role: string

  @Prop()
  teacherId: string

  @Prop()
  image: string

  @Prop()
  phone: string

  @Prop()
  address: string

  @Prop([Quizz])
  testsDone: Quizz[]

  @Prop([Quizz])
  testsAssigned: Quizz[]
}

export const StudentSchema = SchemaFactory.createForClass(Student);
