import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Patch,
  UseGuards,
} from '@nestjs/common';

import { UserService } from './user.service';

import { AuthGuard } from './guards/auth.guard';

import { Id } from 'src/common/decorators/id.decorator';

import { ChangePasswordDto } from './dto/change-password.dto';

import { USER_ROUTES } from 'src/common/routes';
import { RESPONSE_MESSAGES } from 'src/common/messages';

@Controller(USER_ROUTES.BASE)
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUser(@Id() id: string) {
    const user = await this.userService.getUser(id);

    return {
      statusCode: HttpStatus.OK,
      message: RESPONSE_MESSAGES.USER_FOUND,
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
      statusCode: HttpStatus.OK,
      message: RESPONSE_MESSAGES.PASSWORD_CHANGED,
    };
  }
}
