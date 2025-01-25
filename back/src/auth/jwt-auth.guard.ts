import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Définition de la garde d'authentification basée sur JWT
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
