import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { InjectModel } from '@nestjs/mongoose';

import { hashPassword } from 'src/common/functions/hash-password.function';

import type { Model } from 'mongoose';
import { CreateUserDto } from 'src/common/dto/create-user.dto';
import { LogInDto } from 'src/common/dto/log-in.dto';
import { User } from 'src/common/schemas/user.schema';

import { validatePassword } from 'src/common/functions/validate-password.function';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  private generateAccessToken(id: string) {
    const payload = { id };

    const token = this.jwtService.sign(payload);

    return token;
  }

  private async emailExists(email: string): Promise<boolean> {
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

    return this.generateAccessToken(newUser._id.toString());
  }

  async logInUser(login: LogInDto) {
    const user = await this.userModel.findOne({ email: login.email });

    if (!user) throw new NotFoundException('User not found');

    const isPasswordValid = validatePassword(login.password, user.password);

    if (!isPasswordValid)
      throw new UnauthorizedException('Log in unauthorized');

    return this.generateAccessToken(user._id.toString());
  }
}
