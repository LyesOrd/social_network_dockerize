import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { User } from './user.entity';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Req() req: Request): User {
    return req.body as User;
  }
}
