import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { ConfigService } from '@nestjs/config';

import { Observable } from 'rxjs';

import { accessTokenName, ENVIROMENT_VARIABLES } from '../config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    const token = req.cookies[accessTokenName];

    if (!token) {
      throw new UnauthorizedException('Log in please');
    }

    try {
      const decoded = this.jwtService.verify(token, {
        secret: this.configService.get(ENVIROMENT_VARIABLES.JWT_KEY),
      });

      if (!decoded.id) {
        throw new UnauthorizedException('Invalid token');
      }

      req.user = { id: decoded.id };

      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
