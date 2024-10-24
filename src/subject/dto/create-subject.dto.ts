import { Type } from 'class-transformer';

import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';

import { NoteDto } from './note.dto';

import { FlashcardDto } from './flashcard.dto';

import { ExamDto } from './exam.dto';

export class CreateSubjectDto {
  @IsString()
  @Length(24)
  userId: string;

  @IsString()
  @IsNotEmpty()
  subjectName: string;

  @ValidateNested({ each: true })
  @Type(() => NoteDto)
  notes: NoteDto[];

  @IsArray()
  @IsString({ each: true })
  documents: string[];

  @ValidateNested({ each: true })
  @Type(() => FlashcardDto)
  flashcards: FlashcardDto[];

  @ValidateNested({ each: true })
  @Type(() => ExamDto)
  exams: ExamDto[];

  @IsString()
  @IsOptional()
  color: string;
}
