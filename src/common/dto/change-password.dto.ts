import { PickType } from '@nestjs/mapped-types';

import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

import { CreateUserDto } from './create-user.dto';

import { passwordMinLength, passwordRegex } from '../schemas/config';

export class ChangePasswordDto extends PickType(CreateUserDto, [
  'password',
] as const) {
  @IsString()
  @IsNotEmpty()
  @MinLength(passwordMinLength)
  @Matches(passwordRegex)
  newPassword: string;
}
