import { PickType } from '@nestjs/mapped-types';

import { CreateUserDto } from 'src/common/dto/create-user.dto';

export class LogInDto extends PickType(CreateUserDto, [
  'email',
  'password',
] as const) {}
