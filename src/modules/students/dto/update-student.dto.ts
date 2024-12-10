import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentDto } from './create-student.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';



export class AssignQuiz {
    @IsNotEmpty()
    quizsId: string[]

    @IsNotEmpty()
    studentsId: string[]
}

export class DataUpdateStudent {
    @IsOptional()
    name: string

    @IsOptional()
    image: string

    @IsOptional()
    email: string

    @IsOptional()
    _id: string

    @IsOptional()
    password: string

    @IsOptional()
    role: string

    @IsOptional()
    testList: any

    @IsOptional()
    __v: any
}