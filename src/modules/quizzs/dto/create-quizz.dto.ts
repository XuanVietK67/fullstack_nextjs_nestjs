import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateQuizzDto {
    @IsNotEmpty()
    name: string
    @IsNotEmpty()
    description:string
    @IsNotEmpty()
    level: string
    @IsOptional()
    image: string
}
