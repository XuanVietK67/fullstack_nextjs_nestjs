import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateRegisterUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    username: string;
}

export class CreateVerifyUserDto{
    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    code: string
}