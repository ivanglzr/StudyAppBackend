import { PickType } from '@nestjs/mapped-types';

import { CreateUserDto } from 'src/common/dto/create-user.dto';

import { PasswordValidation } from 'src/common/decorators/password-validation.decorator';

export class ChangePasswordDto extends PickType(CreateUserDto, [
  'password',
] as const) {
  @PasswordValidation()
  newPassword: string;
}
