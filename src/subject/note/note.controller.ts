import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from 'src/common/guards/auth.guard';

import { NoteService } from './note.service';

import { Id } from 'src/common/decorators/id.decorator';

import { ValidateIdPipe } from 'src/common/pipes/validate-id.pipe';

import { NoteDto } from './dto/note.dto';

import { NOTE_ROUTES } from 'src/common/routes';

import { subjectIdParamName } from '../config';

import { RESPONSE_MESSAGES } from 'src/common/messages';

@Controller(NOTE_ROUTES.BASE)
@UseGuards(AuthGuard)
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Get()
  async getNotes(
    @Param(subjectIdParamName, ValidateIdPipe) subjectId: string,
    @Id() userId: string,
  ) {
    const notes = await this.noteService.getNotes(userId, subjectId);

    const message =
      notes.length === 0
        ? RESPONSE_MESSAGES.NO_NOTES_FOUND
        : notes.length === 1
          ? RESPONSE_MESSAGES.NOTE_FOUND
          : RESPONSE_MESSAGES.NOTES_FOUND;

    return {
      statusCode: HttpStatus.OK,
      message,
      notes,
    };
  }

  @Get(':noteId')
  async getNote(
    @Param(subjectIdParamName, ValidateIdPipe) subjectId: string,
    @Id() userId: string,
    @Param('noteId', ValidateIdPipe) noteId: string,
  ) {
    const note = await this.noteService.getNote(userId, subjectId, noteId);

    return {
      statusCode: HttpStatus.OK,
      message: RESPONSE_MESSAGES.NOTE_FOUND,
      note,
    };
  }

  @Post()
  async postNote(
    @Id() userId: string,
    @Param(subjectIdParamName, ValidateIdPipe) subjectId: string,
    @Body() note: NoteDto,
  ) {
    await this.noteService.postNote(userId, subjectId, note);

    return {
      statusCode: HttpStatus.CREATED,
      message: RESPONSE_MESSAGES.NOTE_CREATED,
    };
  }

  @Put(':noteId')
  async editNote(
    @Id() userId: string,
    @Param(subjectIdParamName, ValidateIdPipe) subjectId: string,
    @Param('noteId', ValidateIdPipe) noteId: string,
    @Body() note: NoteDto,
  ) {
    await this.noteService.updateNote(userId, subjectId, noteId, note);

    return {
      statusCode: HttpStatus.OK,
      message: RESPONSE_MESSAGES.NOTE_EDITED,
    };
  }

  @Delete(':noteId')
  async deleteNote(
    @Id() userId: string,
    @Param(subjectIdParamName, ValidateIdPipe) subjectId: string,
    @Param('noteId', ValidateIdPipe) noteId: string,
  ) {
    await this.noteService.deleteNote(userId, subjectId, noteId);

    return {
      statusCode: HttpStatus.OK,
      message: RESPONSE_MESSAGES.NOTE_DELETED,
    };
  }
}
