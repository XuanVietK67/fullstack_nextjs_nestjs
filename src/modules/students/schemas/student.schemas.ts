

import { Quizz } from '@/modules/quizzs/schemas/quizz.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type StudentDocument = HydratedDocument<Student>;

export type QuizAssign={
  _id: string
  image: string
  name: string
  description: string
}

export type QuizDone={
  _id: string
  image: string
  name: string
  description: string
  scrore: number
}

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
  testsDone: string[]

  @Prop([])
  testsAssigned: string[]
}

export const StudentSchema = SchemaFactory.createForClass(Student);
