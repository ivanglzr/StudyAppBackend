import { Controller, Get, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth.guard';

import { NOTE_ROUTES } from 'src/common/routes';
import { Id } from 'src/user/decorators/id.decorator';
import { NoteService } from './note.service';

@Controller(NOTE_ROUTES.BASE)
@UseGuards(AuthGuard)
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Get()
  async getNotes(@Id() userId: string) {
    const notes = await this.noteService.getNotes(userId);

    const message =
      notes.length === 0 ? "There isn't any notes" : 'Notes found';

    return {
      statusCode: HttpStatus.OK,
      message,
      notes,
    };
  }
}
