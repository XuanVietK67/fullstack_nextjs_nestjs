import { IsNotEmpty } from "class-validator";

export class AnswerQuestionDto {
    @IsNotEmpty()
    description: string;
    @IsNotEmpty()
    questionId: string
    @IsNotEmpty()
    quizzId:string
    @IsNotEmpty()
    correctAnswer:boolean

    id: string
}
export class CreateQuestionDto {
    @IsNotEmpty()
    description: string;
    @IsNotEmpty()
    quizzId: string
    @IsNotEmpty()
    questionId: string
    answers: AnswerQuestionDto[]
}


