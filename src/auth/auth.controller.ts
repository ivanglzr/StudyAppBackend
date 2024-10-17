import { Body, Controller, HttpStatus, Post } from '@nestjs/common';

import { AuthService } from './auth.service';

import { CreateUserDto } from 'src/user/dto/create-user.dto';

import { AUTH_ROUTES } from 'src/common/routes';

@Controller(AUTH_ROUTES.BASE)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(AUTH_ROUTES.REGISTER)
  async register(@Body() user: CreateUserDto) {
    await this.authService.postUser(user);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'User created',
    };
  }
}
