import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  // createParamDecorator,
  // ExecutionContext,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/users/user.entity';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (user) {
      return this.authService.login(user); // Renvoie un JWT si l'utilisateur est valide
    }
    throw new Error('Invalid credentials');
  }

  @Post('register')
  async register(@Body() body: { email: string; password: string }) {
    return this.authService.register(body.email, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(user: User) {
    return {
      id: user.id,
      email: user.email,
    };
  }
}
