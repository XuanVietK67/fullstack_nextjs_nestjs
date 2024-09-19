import { Body, Controller, Post, HttpCode, HttpStatus, Request, UseGuards, Get } from '@nestjs/common';
import { AuthService } from '@/auth/auth.service';
import { JwtAuthGuard } from '@/auth/passport/jwt-auth.guard';
import { LocalAuthGuard } from '@/auth/passport/local-auth.guard';
import { Public } from '@/auth/decoration/customizePublicAccessToken';
import { CreateRegisterUserDto } from '@/auth/schemas/create-auth.dto';
import { MailerService } from '@nestjs-modules/mailer';
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private readonly mailerService: MailerService,
    ) { }
    @UseGuards(LocalAuthGuard)
    @Public()
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
    @Get('mail')
    @Public()
    TestMail() {
        this.mailerService
            .sendMail({
                to: 'phamxuanviet14920041@gmail.com', // list of receivers
                subject: 'Testing Nest MailerModule ✔', // Subject line
                text: 'welcome', // plaintext body
                html: '<b>hello world from xuanvietdev </b>', // HTML body content
            })
        return "sent email success"
    }
}