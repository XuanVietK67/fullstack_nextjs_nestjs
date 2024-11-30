import { Student } from '@/modules/students/schemas/student.schemas';
import { Teacher } from '@/modules/teacher/schemas/teacher.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsOptional } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type AdminDocument = HydratedDocument<Admin>;

@Schema()
export class Admin {
  @Prop()
  email: string

  @Prop()
  password: string

  @Prop()
  name: string

  @Prop()
  image: string

  @Prop({default: "Admin"})
  role: string

  @Prop({default: false})
  is_active: boolean

  @Prop([Student])
  studentList: Student[]

  @Prop([Teacher])
  teacherList: Teacher[]
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
