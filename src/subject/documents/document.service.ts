import * as fs from 'node:fs/promises';
import { createReadStream } from 'node:fs';

import * as path from 'node:path';

import { Injectable, NotFoundException, StreamableFile } from '@nestjs/common';

import { SubjectService } from '../subject.service';

import { documentsDestination } from './config';

@Injectable()
export class DocumentService {
  constructor(private readonly subjectService: SubjectService) {}

  getFilePath(filename: string) {
    const filePath = path.join(process.cwd(), documentsDestination, filename);

    return filePath;
  }

  async deleteFile(filename: string) {
    try {
      const filePath = this.getFilePath(filename);

      await fs.unlink(filePath);
    } catch (e) {}
  }

  async getFile(userId: string, subjectId: string, filename: string) {
    const { documents } = await this.subjectService.findSubjectById(
      userId,
      subjectId,
    );

    if (!documents.includes(filename))
      throw new NotFoundException('File not found');

    const file = createReadStream(this.getFilePath(filename));

    return file;
  }

  async postDocument(userId: string, subjectId: string, filename: string) {
    const subject = await this.subjectService.findSubjectById(
      userId,
      subjectId,
    );

    subject.documents.push(filename);

    await subject.save();
  }
}
