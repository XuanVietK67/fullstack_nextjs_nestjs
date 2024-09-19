import { Body, Controller, Post, HttpCode, HttpStatus, Request, UseGuards, Get } from '@nestjs/common';
import { AuthService } from '@/auth/auth.service';
import { JwtAuthGuard } from '@/auth/passport/jwt-auth.guard';
import { LocalAuthGuard } from '@/auth/passport/local-auth.guard';
import { Public } from '@/auth/decoration/customizePublicAccessToken';
import { CreateRegisterUserDto } from '@/auth/schemas/create-auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
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
    postRegister(@Body() registerDto: CreateRegisterUserDto){
        return this.authService.register(registerDto)
    }
}