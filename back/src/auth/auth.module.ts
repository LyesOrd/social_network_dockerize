import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(), // Import du module ConfigModule
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Utilisation d'une clé secrète, peut être obtenue via ConfigService
      signOptions: { expiresIn: '60m' }, // Durée d'expiration du token
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
