import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../users/user.entity';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'), // Utilisation d'une clé secrète, peut être obtenue via ConfigService
    });
  }

  async validate(payload: any): Promise<User> {
    console.log(payload, 'payload');
    const user = await this.authService.findById(payload.id); // Récupère l'utilisateur à partir du payload (sub = userId)
    if (!user) {
      throw new UnauthorizedException('User not found'); // Si l'utilisateur n'existe pas, une exception est levée
    }
    return user; // L'utilisateur sera attaché à req.user
  }
}
