import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('login')
  async login(@Body() loginDto: LoginDto){
    return await this.authService.login(loginDto);
  }

  @Post('register')
  async register(@Body() registerDto: CreateUserDto){
      return this.authService.register(registerDto);
  }
}
