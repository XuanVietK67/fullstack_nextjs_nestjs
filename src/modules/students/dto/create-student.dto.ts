import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateStudentDto {
    @IsNotEmpty()
    email: string
    @IsNotEmpty()
    password: string
    @IsNotEmpty()
    name: string
    @IsOptional()
    image: string
    @IsOptional()
    phone: string
    @IsOptional()
    address: string
    // @IsNotEmpty()
    // role: string
}

