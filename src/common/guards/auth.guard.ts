import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { ConfigService } from '@nestjs/config';

import { accessTokenName, ENVIROMENT_VARIABLES } from 'src/common/config';

import { ERROR_MESSAGES } from 'src/common/messages';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const token = req.cookies[accessTokenName];

    if (!token) {
      throw new UnauthorizedException(ERROR_MESSAGES.LOG_IN_UNAUTHORIZED);
    }

    try {
      const decoded = this.jwtService.verify(token, {
        secret: this.configService.get(ENVIROMENT_VARIABLES.JWT_KEY),
      });

      if (!decoded.id) {
        throw new UnauthorizedException(ERROR_MESSAGES.LOG_IN_UNAUTHORIZED);
      }

      req.user = { id: decoded.id };

      return true;
    } catch (error) {
      throw new UnauthorizedException(ERROR_MESSAGES.LOG_IN_UNAUTHORIZED);
    }
  }
}
