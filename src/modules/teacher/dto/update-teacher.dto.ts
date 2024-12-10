import { IsOptional } from 'class-validator';


export class UpdateTeacher{
    @IsOptional()
    name: string

    @IsOptional()
    image: string

    @IsOptional()
    email: string

    @IsOptional()
    _id: string

    @IsOptional()
    password: string

    @IsOptional()
    role: string

    @IsOptional()
    testList: any

    @IsOptional()
    __v: any

}