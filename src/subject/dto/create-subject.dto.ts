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

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NoteDto)
  notes: NoteDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FlashcardDto)
  flashcards: FlashcardDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExamDto)
  exams: ExamDto[];

  @IsOptional()
  @IsString()
  color: string;

  documents: string[];

  constructor(partial: Partial<CreateSubjectDto>) {
    Object.assign(this, partial);

    this.notes ??= [];
    this.flashcards ??= [];
    this.exams ??= [];
    this.documents = [];
  }
}
