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
} from '../schemas/user/config';

import { PasswordValidation } from '../decorators/password-validation.decorator';

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

  @PasswordValidation()
  password: string;
}
