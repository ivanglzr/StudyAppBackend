import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

import {
  emailMinLength,
  emailRegex,
  fullnameMinLength,
} from '../schemas/user/config';

import { PasswordValidation } from '../decorators/password-validation.decorator';

import { IRegister } from '@study-app/types';

export class CreateUserDto implements IRegister {
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
