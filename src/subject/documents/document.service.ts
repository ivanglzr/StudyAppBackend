import * as fs from 'node:fs/promises';
import { createReadStream } from 'node:fs';

import * as path from 'node:path';

import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  StreamableFile,
} from '@nestjs/common';

import { SubjectService } from '../subject.service';

import { documentsDestination } from './config';

@Injectable()
export class DocumentService {
  constructor(private readonly subjectService: SubjectService) {}

  getFilePath(filename: string) {
    const filePath = path.join(process.cwd(), documentsDestination, filename);

    return filePath;
  }

  async getFile(userId: string, subjectId: string, filename: string) {
    const { documents } = await this.subjectService.findSubjectById(
      userId,
      subjectId,
    );

    if (!documents.includes(filename))
      throw new NotFoundException('File not found');

    const filePath = this.getFilePath(filename);

    try {
      await fs.access(filePath);
    } catch (error) {
      throw new NotFoundException('File not found');
    }

    return createReadStream(filePath);
  }

  async postDocument(userId: string, subjectId: string, filename: string) {
    const subject = await this.subjectService.findSubjectById(
      userId,
      subjectId,
    );

    subject.documents.push(filename);

    await subject.save();
  }

  async deleteFile(userId: string, subjectId: string, filename: string) {
    const subject = await this.subjectService.findSubjectById(
      userId,
      subjectId,
    );

    const documentIndex = subject.documents.findIndex(
      (document) => document === filename,
    );

    if (documentIndex === -1) throw new NotFoundException('File not found');

    try {
      const filePath = this.getFilePath(filename);

      await fs.unlink(filePath);

      subject.documents.splice(documentIndex, 1);

      await subject.save();
    } catch (e) {
      throw new InternalServerErrorException('Failed to delete file');
    }
  }
}
