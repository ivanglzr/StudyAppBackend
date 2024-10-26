import { Controller, Get, HttpStatus, Param, UseGuards } from '@nestjs/common';

import { AuthGuard } from 'src/common/guards/auth.guard';

import { NoteService } from './note.service';

import { Id } from 'src/user/decorators/id.decorator';

import { ValidateIdPipe } from 'src/common/pipes/validate-id.pipe';

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
      status: HttpStatus.OK,
      message: 'Note found',
      note,
    };
  }
}
