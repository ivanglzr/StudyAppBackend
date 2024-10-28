import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from 'src/common/guards/auth.guard';

import { NoteService } from './note.service';

import { Id } from 'src/user/decorators/id.decorator';

import { ValidateIdPipe } from 'src/common/pipes/validate-id.pipe';

import { NoteDto } from './dto/note.dto';

import { NOTE_ROUTES } from 'src/common/routes';

import { subjectIdParamName } from './config';

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
      notes.length === 0 ? "There isn't any notes" : 'Notes found';

    return {
      statusCode: HttpStatus.OK,
      message,
      notes,
    };
  }

  @Get(':id')
  async getNote(
    @Param(subjectIdParamName, ValidateIdPipe) subjectId: string,
    @Id() userId: string,
    @Param('id') noteId: string,
  ) {
    const note = await this.noteService.getNote(userId, subjectId, noteId);

    return {
      statusCode: HttpStatus.OK,
      message: 'Note found',
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
      message: 'Note created',
    };
  }

  @Put(':noteId')
  async editNote(
    @Id() userId: string,
    @Param(subjectIdParamName, ValidateIdPipe) subjectId: string,
    @Param('noteId') noteId: string,
    @Body() note: NoteDto,
  ) {
    await this.noteService.updateNote(userId, subjectId, noteId, note);

    return {
      status: HttpStatus.OK,
      message: 'Note updated',
    };
  }
}
