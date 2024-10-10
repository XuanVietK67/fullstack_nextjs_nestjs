import { Body, Controller, Post, HttpCode, HttpStatus, Request, UseGuards, Get } from '@nestjs/common';
import { AuthService } from '@/auth/auth.service';
import { JwtAuthGuard } from '@/auth/passport/jwt-auth.guard';
import { LocalAuthGuard } from '@/auth/passport/local-auth.guard';
import { Public, ResponseMessage } from '@/auth/decoration/customizePublicAccessToken';
import { changePassword, CreateRegisterUserDto, createResendMailDto, CreateVerifyUserDto } from '@/auth/schemas/create-auth.dto';
import { MailerService } from '@nestjs-modules/mailer';
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private readonly mailerService: MailerService,
    ) { }
    @UseGuards(LocalAuthGuard)
    @Public()
    @ResponseMessage('Fetched Stats Succesfully')
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
    @Post('register')
    @Public()
    postRegister(@Body() registerDto: CreateRegisterUserDto) {
        return this.authService.register(registerDto)
    }
    @Post('verify')
    @Public()
    postVerify(@Body() verifyDto: CreateVerifyUserDto){
        return this.authService.verify(verifyDto)
    }
    @Post('mail')
    @Public()
    postResendMail(@Body() Resend: createResendMailDto){
        return this.authService.resend(Resend)
    }
    @Post('forgot')
    @Public()
    postChangePassword(@Body() ChangePasswordDto: changePassword){
        return this.authService.changePassword(ChangePasswordDto)
    }
}