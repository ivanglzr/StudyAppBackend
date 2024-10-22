import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

import { User } from 'src/common/schemas/user/user.schema';

import {
  emailMinLength,
  emailRegex,
  fullnameMinLength,
  passwordMinLength,
  passwordRegex,
} from '../schemas/user/config';

export class CreateUserDto implements User {
  @IsString()
  @IsNotEmpty()
  @MinLength(fullnameMinLength)
  fullname: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @MinLength(emailMinLength)
  @Matches(emailRegex)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(passwordMinLength)
  @Matches(passwordRegex)
  password: string;
}
