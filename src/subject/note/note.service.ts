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

  async getNotes(userId: string, subjectId: string) {
    const subject = await this.subjectModel
      .findOne({ userId, _id: subjectId })
      .select(['notes'] as Array<keyof Subject>);

    if (!subject) throw new NotFoundException('Subject not found');

    return subject.notes;
  }

  async getNote(userId: string, subjectId: string, noteId: string) {
    const subject = await this.subjectModel
      .findOne({ userId, _id: subjectId })
      .select(['notes'] as Array<keyof Subject>);

    if (!subject) throw new NotFoundException('Subject not found');

    const note = subject.notes.find((note) => note._id.toString() === noteId);

    if (!note) throw new NotFoundException('Note not found');

    return note;
  }

  async postNote(userId: string, subjectId: string, note: NoteDto) {
    const subject = await this.subjectModel.findOne({ userId, _id: subjectId });

    if (!subject) throw new NotFoundException('Subject not found');

    subject.notes.push(note as Note);

    await subject.save();
  }
}
