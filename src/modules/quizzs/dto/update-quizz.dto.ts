import { PartialType } from '@nestjs/mapped-types';
import { CreateQuizzDto, Question } from './create-quizz.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Optional } from '@nestjs/common';


export class DataGetQuestionsDto{
    @IsNotEmpty()
    quizzId: string
}
export class UpdateQuizzDto{
    @IsOptional()
    name: string
    @IsOptional()
    description: string
    @IsOptional()
    level: string
    @IsOptional()
    image: string
    @IsOptional()
    questions?: Question[]
}

export class UpdateQuestion{
    @IsNotEmpty()
    _id : string
    @IsNotEmpty()
    index: number
    @IsOptional()
    question: Question[]
}

export class Score{
    @IsNotEmpty()
    result: string[]
    @IsNotEmpty()
    _id: string
}