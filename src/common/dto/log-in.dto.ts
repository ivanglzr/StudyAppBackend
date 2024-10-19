import { OmitType } from '@nestjs/mapped-types';

import { CreateUserDto } from './create-user.dto';

export class LogInDto extends OmitType(CreateUserDto, ['fullname'] as const) {}
