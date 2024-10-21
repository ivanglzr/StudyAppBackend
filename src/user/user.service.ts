import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { hashPassword } from 'src/common/functions/hash-password.function';
import { validatePassword } from 'src/common/functions/validate-password.function';
import { ERROR_MESSAGES } from 'src/common/messages';

import { User } from 'src/common/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUser(id: string): Promise<User> {
    const user = await this.userModel
      .findById(id)
      .select(['email', 'fullname', '-_id'] as Array<keyof User>);

    if (!user) throw new NotFoundException(ERROR_MESSAGES.USER_NOT_FOUND);

    return user;
  }

  async changePassword(id: string, password: string, newPassword: string) {
    const user = await this.userModel.findById(id);

    if (!user) throw new NotFoundException(ERROR_MESSAGES.USER_NOT_FOUND);

    const isPasswordValid = validatePassword(password, user.password);

    if (!isPasswordValid)
      throw new UnauthorizedException(ERROR_MESSAGES.PASSWORD_NOT_VALID);

    user.password = hashPassword(newPassword);

    await user.save();
  }
}
