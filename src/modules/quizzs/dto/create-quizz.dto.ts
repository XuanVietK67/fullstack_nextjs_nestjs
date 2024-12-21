import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateQuizzDto {
    @IsNotEmpty()
    name: string
    @IsNotEmpty()
    description: string
    @IsNotEmpty()
    teacherId: string
    @IsNotEmpty()
    level: string
    @IsOptional()
    image: string
}

export type Answer={
    description: string
    correctAnswer: boolean
}

export type Question = {
    description: string
    image?: string
    answers: Answer[]
}
