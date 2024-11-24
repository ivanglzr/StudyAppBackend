import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Subject } from 'src/common/schemas/subject/subject.schema';

import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

import { ERROR_MESSAGES } from 'src/common/messages';

@Injectable()
export class SubjectService {
  constructor(
    @InjectModel(Subject.name) private readonly subjectModel: Model<Subject>,
  ) {}

  async subjectExists(userId: string, subjectName: string): Promise<boolean> {
    return !!(await this.subjectModel.findOne({ userId, subjectName }));
  }

  async findAll(userId: string) {
    return this.subjectModel.find({ userId });
  }

  async findSubjectById(userId: string, subjectId: string) {
    const subject = await this.subjectModel.findOne({ userId, _id: subjectId });

    if (!subject) throw new NotFoundException(ERROR_MESSAGES.SUBJECT_NOT_FOUND);

    return subject;
  }

  async createSubject(userId: string, subject: CreateSubjectDto) {
    const subjectExists = await this.subjectExists(userId, subject.subjectName);

    if (subjectExists)
      throw new ConflictException(ERROR_MESSAGES.SUBJECT_EXISTS);

    const newSubject = new this.subjectModel({
      userId,
      ...subject,
    });

    await newSubject.save();
  }

  async updateSubject(
    userId: string,
    subjectId: string,
    subject: UpdateSubjectDto,
  ) {
    const updatedSubject = await this.subjectModel.findOneAndUpdate(
      { _id: subjectId, userId },
      subject,
    );

    if (!updatedSubject)
      throw new NotFoundException(ERROR_MESSAGES.SUBJECT_NOT_FOUND);
  }

  async deleteSubject(userId: string, subjectId: string) {
    const deletedSubject = await this.subjectModel.findOneAndDelete({
      _id: subjectId,
      userId,
    });

    if (!deletedSubject)
      throw new NotFoundException(ERROR_MESSAGES.SUBJECT_NOT_FOUND);
  }
}
