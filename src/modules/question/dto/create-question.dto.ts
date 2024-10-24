import { IsNotEmpty, IsOptional } from "class-validator";

export class AnswerQuestionDto {
    @IsNotEmpty()
    description: string;
    @IsNotEmpty()
    correctAnswer:boolean
}

export class DataAddAnswer{
    @IsNotEmpty()
    answers: AnswerQuestionDto[]
    // @IsNotEmpty()
    // questionId: string
    // @IsNotEmpty()
    // quizzId: string
}

export class CreateQuestionDto {
    @IsNotEmpty()
    description: string;
    @IsNotEmpty()
    quizzId: string
    @IsOptional()
    answers: AnswerQuestionDto[]
    @IsOptional()
    image: string
}


