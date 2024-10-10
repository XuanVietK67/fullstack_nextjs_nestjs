import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class CreateRegisterUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    username: string;
}

export class CreateVerifyUserDto {
    @IsEmail()
    email: string


    @IsNotEmpty()
    code: string
}

export class createResendMailDto {
    @IsNotEmpty()
    @IsEmail()
    username: string
}

export class changePassword {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    password: string
}