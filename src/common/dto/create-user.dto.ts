import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

import { User } from 'src/common/schemas/user.schema';

import {
  emailMinLength,
  fullnameMinLength,
  passwordMinLength,
} from '../schemas/config';

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
  @IsNotEmpty()
  @MinLength(passwordMinLength)
  password: string;
}
