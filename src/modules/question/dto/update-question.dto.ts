
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateQuestionDto {
    @IsNotEmpty()
    questionId: string;
    @IsNotEmpty()
    quizzId: string
    @IsOptional()
    description: string
}

export class DeleteQuestionDto{
    @IsNotEmpty()
    questionId: string;
    @IsNotEmpty()
    quizzId: string
}

export class UpdateAnswer{
    @IsNotEmpty()
    questionId: string;
    @IsNotEmpty()
    quizzId: string
    @IsNotEmpty()
    answerId: string
    @IsOptional()
    description: string
    @IsOptional()
    correctAnswer: boolean
}