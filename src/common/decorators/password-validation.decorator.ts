import { applyDecorators } from '@nestjs/common';

import { IsString, MinLength, Matches, IsNotEmpty } from 'class-validator';

import { passwordMinLength, passwordRegex } from '../schemas/user/config';

export function PasswordValidation() {
  return applyDecorators(
    IsString(),
    IsNotEmpty(),
    MinLength(passwordMinLength),
    Matches(passwordRegex),
  );
}
