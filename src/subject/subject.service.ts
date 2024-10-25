import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Subject } from 'src/common/schemas/subject/subject.schema';

import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

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

  async updateSubject(
    userId: string,
    subjectId: string,
    partialSubject: UpdateSubjectDto,
  ) {
    const subject = await this.subjectModel.findById(subjectId);

    if (!subject) throw new NotFoundException('Subject not found');

    if (subject.userId.toString() !== userId)
      throw new ForbiddenException("You can't edit this subject");

    const newSubject = { ...subject, ...partialSubject };

    subject.set(newSubject);

    await subject.save();
  }
}
