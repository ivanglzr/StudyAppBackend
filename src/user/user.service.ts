import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

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
}
