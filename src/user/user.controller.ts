import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Patch,
  UseGuards,
} from '@nestjs/common';

import { UserService } from './user.service';

import { AuthGuard } from 'src/common/guards/auth.guard';

import { Id } from 'src/common/decorators/id.decorator';

import { ChangePasswordDto } from 'src/common/dto/change-password.dto';

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

  @Patch(USER_ROUTES.CHANGE_PASSWORD)
  async changePassword(
    @Id() id: string,
    @Body() { password, newPassword }: ChangePasswordDto,
  ) {
    await this.userService.changePassword(id, password, newPassword);

    return {
      HttpStatus: HttpStatus.OK,
      message: 'Password changed',
    };
  }
}
