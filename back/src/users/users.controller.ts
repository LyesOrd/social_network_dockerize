import { Controller, Get, Req } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { User } from './user.entity';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  // @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@Req() req: Request): User {
    return req.body as User;
  }
}
