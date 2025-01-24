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
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/users/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService
      .validateUser(body.email, body.password)
      .then((user) => this.authService.login(user));
  }

  @Post('register')
  async register(@Body() body: { email: string; password: string }) {
    return this.authService.register(body.email, body.password);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getProfile(user: User) {
    return {
      id: user.id,
      email: user.email,
    };
  }
}

// export const CurrentUser = createParamDecorator(
//   (data: unknown, ctx: ExecutionContext) => {
//     const request = ctx.switchToHttp().getRequest();
//     return request.user;
//   },
// );
