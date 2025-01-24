import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extrait le token de l'en-tête Authorization
      ignoreExpiration: false, // Empêche l'utilisation de tokens expirés
      secretOrKey: process.env.JWT_SECRET || 'defaultSecretKey', // La clé secrète pour valider les tokens
    });
  }

  async validate(payload: any): Promise<User> {
    const user = await this.usersService.findById(payload.sub); // Récupère l'utilisateur à partir du payload (sub = userId)
    if (!user) {
      throw new UnauthorizedException(); // Si l'utilisateur n'existe pas, une exception est levée
    }
    return user; // L'utilisateur sera attaché à req.user
  }
}
