import { Injectable, NotFoundException } from '@nestjs/common';

import { SubjectService } from '../subject.service';

import { NoteDto } from './dto/note.dto';

import { Note } from 'src/common/schemas/subject/note/note.schema';

import { ERROR_MESSAGES } from 'src/common/messages';

@Injectable()
export class NoteService {
  constructor(private readonly subjectService: SubjectService) {}

  async getNotes(userId: string, subjectId: string) {
    const subject = await this.subjectService.findSubjectById(
      userId,
      subjectId,
    );

    return subject.notes;
  }

  async getNote(userId: string, subjectId: string, noteId: string) {
    const subject = await this.subjectService.findSubjectById(
      userId,
      subjectId,
    );

    const note = subject.notes.find((note) => note._id.toString() === noteId);

    if (!note) throw new NotFoundException(ERROR_MESSAGES.NOTE_NOT_FOUND);

    return note;
  }

  async postNote(userId: string, subjectId: string, note: NoteDto) {
    const subject = await this.subjectService.findSubjectById(
      userId,
      subjectId,
    );

    subject.notes.push(note as Note);

    await subject.save();
  }

  async updateNote(
    userId: string,
    subjectId: string,
    noteId: string,
    note: NoteDto,
  ) {
    const subject = await this.subjectService.findSubjectById(
      userId,
      subjectId,
    );

    const noteIndex = subject.notes.findIndex(
      (note) => note._id.toString() === noteId,
    );

    if (noteIndex === -1)
      throw new NotFoundException(ERROR_MESSAGES.NOTE_NOT_FOUND);

    subject.notes[noteIndex] = { _id: subject.notes[noteIndex]._id, ...note };

    await subject.save();
  }

  async deleteNote(userId: string, subjectId: string, noteId: string) {
    const subject = await this.subjectService.findSubjectById(
      userId,
      subjectId,
    );

    const noteIndex = subject.notes.findIndex(
      (note) => note._id.toString() === noteId,
    );

    subject.notes.splice(noteIndex, 1);

    await subject.save();
  }
}
