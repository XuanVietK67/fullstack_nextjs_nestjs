

import { Quizz } from '@/modules/quizzs/schemas/quizz.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TeacherDocument = HydratedDocument<Teacher>;

@Schema()
export class Teacher {
    @Prop()
    email: string

    @Prop()
    password: string

    @Prop()
    name: string

    @Prop()
    image: string

    @Prop({default: "teacher"})
    role: string

    @Prop([Quizz])
    testList: Quizz[]
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);
