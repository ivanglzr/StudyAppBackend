import { Type } from 'class-transformer';

import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import { NoteDto } from '../note/dto/note.dto';

import { FlashcardDto } from '../flashcard/dto/flashcard.dto';

import { ExamDto } from '../exam/dto/exam.dto';

export class CreateSubjectDto {
  @IsString()
  @IsNotEmpty()
  subjectName: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NoteDto)
  notes: NoteDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FlashcardDto)
  flashcards: FlashcardDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExamDto)
  exams: ExamDto[];

  @IsString()
  @IsOptional()
  color: string;
}
