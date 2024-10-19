import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { hashPassword } from 'src/common/functions/hash-password.function';
import { validatePassword } from 'src/common/functions/validate-password.function';

import { User } from 'src/common/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUser(id: string): Promise<User> {
    const user = await this.userModel
      .findById(id)
      .select(['email', 'fullname', '-_id'] as Array<keyof User>);

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async changePassword(id: string, password: string, newPassword: string) {
    const user = await this.userModel.findById(id);

    if (!user) throw new NotFoundException('User not found');

    const isPasswordValid = validatePassword(password, user.password);

    if (!isPasswordValid) throw new UnauthorizedException('Unauthorized');

    user.password = hashPassword(newPassword);

    await user.save();
  }
}
