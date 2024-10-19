import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';

import { Response } from 'express';

import { AuthService } from './auth.service';

import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LogInDto } from 'src/user/dto/log-in.dto';

import { AUTH_ROUTES } from 'src/common/routes';
import { accessTokenName } from 'src/common/config';

@Controller(AUTH_ROUTES.BASE)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(AUTH_ROUTES.REGISTER)
  async register(
    @Body() user: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.authService.postUser(user);

    res.cookie(accessTokenName, token);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'User created',
    };
  }

  @Post(AUTH_ROUTES.LOG_IN)
  @HttpCode(200)
  async logIn(
    @Body() login: LogInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.authService.logInUser(login);

    res.cookie(accessTokenName, token);

    return {
      statusCode: HttpStatus.OK,
      message: 'Log in successful',
    };
  }
}
