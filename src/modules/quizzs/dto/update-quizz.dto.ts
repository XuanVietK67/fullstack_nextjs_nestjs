import { PartialType } from '@nestjs/mapped-types';
import { CreateQuizzDto } from './create-quizz.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Questions } from '@/modules/question/schemas/question.schema';


export class DataGetQuestionsDto{
    @IsNotEmpty()
    quizzId: string
}
export class UpdateQuizzDto{
    @IsNotEmpty()
    _id: string
    @IsOptional()
    name: string
    @IsOptional()
    description: string
    @IsOptional()
    level: string
    @IsOptional()
    image: string
    @IsOptional()
    questions: Questions[]
}