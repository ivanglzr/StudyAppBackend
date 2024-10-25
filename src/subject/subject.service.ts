import { ConflictException, Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Subject } from 'src/common/schemas/subject/subject.schema';

import { CreateSubjectDto } from './dto/create-subject.dto';

@Injectable()
export class SubjectService {
  constructor(
    @InjectModel(Subject.name) private readonly subjectModel: Model<Subject>,
  ) {}

  async subjectExists(subjectName: string): Promise<boolean> {
    return !!(await this.subjectModel.findOne({ subjectName }));
  }

  async findAll(userId: string) {
    return this.subjectModel.find({ userId });
  }

  async createSubject(userId: string, subject: CreateSubjectDto) {
    if (this.subjectExists(subject.subjectName))
      throw new ConflictException(
        'Subject already exists, please use another name',
      );

    const newSubject = new this.subjectModel({
      userId,
      ...subject,
    });

    await newSubject.save();
  }
}
