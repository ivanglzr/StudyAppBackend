import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

import type { User } from '../schemas/user.schemas';

import {
  emailMinLength,
  fullnameMinLength,
  passwordMinLength,
} from '../config';

export class CreateUserDto implements User {
  @IsString()
  @IsNotEmpty()
  @MinLength(fullnameMinLength)
  fullname: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @MinLength(emailMinLength)
  email: string;

  @IsString()
  @MinLength(passwordMinLength)
  password: string;
}
