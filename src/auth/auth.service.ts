import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import type { Model } from 'mongoose';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/schemas/user.schema';

import { hashPassword } from 'src/common/functions/hash-password.function';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async emailExists(email: string): Promise<boolean> {
    return !!(await this.userModel.findOne({ email }));
  }

  async postUser(user: CreateUserDto) {
    const emailExists = await this.emailExists(user.email);

    if (emailExists) throw new ConflictException('Email already exists');

    const hashedPassword = hashPassword(user.password);

    const newUser = new this.userModel({
      ...user,
      password: hashedPassword,
    });

    await newUser.save();
  }
}
