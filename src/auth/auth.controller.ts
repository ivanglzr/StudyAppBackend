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

import { CreateUserDto } from 'src/common/dto/create-user.dto';
import { LogInDto } from './dto/log-in.dto';

import { AUTH_ROUTES } from 'src/common/routes';
import { accessTokenName } from 'src/common/config';

import { cookieOptions } from './config';
import { RESPONSE_MESSAGES } from 'src/common/messages';

@Controller(AUTH_ROUTES.BASE)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(AUTH_ROUTES.REGISTER)
  async register(
    @Body() user: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.authService.postUser(user);

    res.cookie(accessTokenName, token, cookieOptions);

    return {
      statusCode: HttpStatus.CREATED,
      message: RESPONSE_MESSAGES.USER_CREATED,
    };
  }

  @Post(AUTH_ROUTES.LOG_IN)
  @HttpCode(200)
  async logIn(
    @Body() login: LogInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.authService.logInUser(login);

    res.cookie(accessTokenName, token, cookieOptions);

    return {
      statusCode: HttpStatus.OK,
      message: RESPONSE_MESSAGES.LOG_IN_SUCCESSFUL,
    };
  }
}
