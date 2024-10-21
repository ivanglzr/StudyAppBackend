import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

import { ERROR_MESSAGES } from '../messages';

export class ValidateIdPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (value.length !== 24 || !value || typeof value !== 'string')
      throw new BadRequestException(ERROR_MESSAGES.ID_NOT_VALID);

    return value;
  }
}
