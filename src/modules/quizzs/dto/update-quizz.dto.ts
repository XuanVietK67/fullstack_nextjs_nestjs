import { PartialType } from '@nestjs/mapped-types';
import { CreateQuizzDto } from './create-quizz.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';


export class DataGetQuestionsDto{
    @IsNotEmpty()
    quizzId: string
}
export class UpdateQuizzDto{
    @IsNotEmpty()
    id: string
    @IsOptional()
    name: string
    @IsOptional()
    description: string
    @IsOptional()
    level: string
    @IsOptional()
    image: string
}