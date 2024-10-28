import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { Subject } from 'src/common/schemas/subject/subject.schema';

import { NoteDto } from './dto/note.dto';

import { Note } from 'src/common/schemas/subject/note/note.schema';

@Injectable()
export class NoteService {
  constructor(
    @InjectModel(Subject.name) private readonly subjectModel: Model<Subject>,
  ) {}

  async findSubject(userId: string, subjectId: string) {
    const subject = await this.subjectModel.findOne({ userId, _id: subjectId });

    if (!subject) throw new NotFoundException('Subject not found');

    return subject;
  }

  async getNotes(userId: string, subjectId: string) {
    const subject = await this.findSubject(userId, subjectId);

    return subject.notes;
  }

  async getNote(userId: string, subjectId: string, noteId: string) {
    const subject = await this.findSubject(userId, subjectId);

    const note = subject.notes.find((note) => note._id.toString() === noteId);

    if (!note) throw new NotFoundException('Note not found');

    return note;
  }

  async postNote(userId: string, subjectId: string, note: NoteDto) {
    const subject = await this.findSubject(userId, subjectId);

    subject.notes.push(note as Note);

    await subject.save();
  }

  async updateNote(
    userId: string,
    subjectId: string,
    noteId: string,
    note: NoteDto,
  ) {
    const subject = await this.findSubject(userId, subjectId);

    const noteIndex = subject.notes.findIndex(
      (note) => note._id.toString() === noteId,
    );

    if (noteIndex === -1) throw new NotFoundException('Note not found');

    subject.notes[noteIndex] = { _id: subject.notes[noteIndex]._id, ...note };

    await subject.save();
  }

  async deleteNote(userId: string, subjectId: string, noteId: string) {
    const subject = await this.findSubject(userId, subjectId);

    const noteIndex = subject.notes.findIndex(
      (note) => note._id.toString() === noteId,
    );

    subject.notes.splice(noteIndex, 1);

    await subject.save();
  }
}
