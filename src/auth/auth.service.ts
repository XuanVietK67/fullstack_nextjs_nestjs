import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@/modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from '@/util/helper';
import { changePassword, CreateRegisterUserDto, createResendMailDto, CreateVerifyUserDto } from '@/auth/schemas/create-auth.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findUserByEmail(username);
        const isValidPassword = await comparePassword(pass, user.password)
        if (isValidPassword) {
            return user;
        }
        return null;
    }
    async login(user: any) {
        const payload = { username: user.email, sub: user._id };
        
        return {
            user: {
                username: user.name,
                email: user.email,
                _id: user._id,
                role: user.role,
                image: user.image
            },
            access_token: this.jwtService.sign(payload),
        };
    }
    async register(user: CreateRegisterUserDto) {
        return this.usersService.CreateRegisterUser(user)
    }
    async verify(verifyData: CreateVerifyUserDto){
        return this.usersService.CreateVerifyUser(verifyData)
    }
    async resend(ResendData: createResendMailDto){
        return this.usersService.ResendMail(ResendData)
    }
    async changePassword(passwordData: changePassword){
        return this.usersService.changePassword(passwordData)
    }
}