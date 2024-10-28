import { Type } from 'class-transformer';

import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';

import { NoteDto } from '../note/dto/note.dto';

import { FlashcardDto } from './flashcard.dto';

import { ExamDto } from './exam.dto';

export class CreateSubjectDto {
  @IsString()
  @IsNotEmpty()
  subjectName: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NoteDto)
  notes: NoteDto[];

  @IsArray()
  @IsString({ each: true })
  documents: string[];

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
