import { PickType } from '@nestjs/mapped-types';

import { CreateUserDto } from './create-user.dto';

import { PasswordValidation } from '../decorators/password-validation.decorator';

export class ChangePasswordDto extends PickType(CreateUserDto, [
  'password',
] as const) {
  @PasswordValidation()
  newPassword: string;
}
