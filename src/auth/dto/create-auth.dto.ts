import {  IsNotEmpty } from "class-validator";

export class createSignIn {
    @IsNotEmpty({message: "User name cannot be empty"})
    username:string;
    @IsNotEmpty({message: "Password cannot be empty"})
    password:string;
}
