import { PickType } from '@nestjs/mapped-types';

import { IsNotEmpty, IsString, MinLength } from 'class-validator';

import { CreateUserDto } from './create-user.dto';

import { passwordMinLength } from '../schemas/config';

export class ChangePasswordDto extends PickType(CreateUserDto, [
  'password',
] as const) {
  @IsString()
  @IsNotEmpty()
  @MinLength(passwordMinLength)
  newPassword: string;
}
