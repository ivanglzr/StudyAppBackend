import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

import { flashcardMinLength } from 'src/common/schemas/subject/flashcard/config';

export class FlashcardDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(flashcardMinLength)
  title: string;

  @IsArray()
  @IsString({ each: true })
  answers: string[];

  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsOptional()
  @IsBoolean()
  learned: boolean;
}
