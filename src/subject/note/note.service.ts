import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { Subject } from 'src/common/schemas/subject/subject.schema';

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
}
