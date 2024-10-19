import { Controller, Get, HttpStatus, UseGuards } from '@nestjs/common';

import { UserService } from './user.service';

import { AuthGuard } from 'src/common/guards/auth.guard';

import { Id } from 'src/common/decorators/id.decorator';

import { USER_ROUTES } from 'src/common/routes';

@Controller(USER_ROUTES.BASE)
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUser(@Id() id: string) {
    const user = await this.userService.getUser(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'User found',
      user,
    };
  }
}
