import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import type { Model } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) userModel: Model<User>) {}
}
