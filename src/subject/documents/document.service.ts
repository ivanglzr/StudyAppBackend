import * as fs from 'node:fs/promises';
import { createReadStream } from 'node:fs';

import * as path from 'node:path';

import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { SubjectService } from '../subject.service';

import { documentsDestination } from './config';

import { ERROR_MESSAGES } from 'src/common/messages';

@Injectable()
export class DocumentService {
  constructor(private readonly subjectService: SubjectService) {}

  getFilePath(filename: string) {
    const filePath = path.join(process.cwd(), documentsDestination, filename);

    return filePath;
  }

  async getDocument(userId: string, subjectId: string, filename: string) {
    const { documents } = await this.subjectService.findSubjectById(
      userId,
      subjectId,
    );

    if (!documents.includes(filename))
      throw new NotFoundException(ERROR_MESSAGES.DOCUMENT_NOT_FOUND);

    const filePath = this.getFilePath(filename);

    try {
      await fs.access(filePath);
    } catch (error) {
      throw new NotFoundException(ERROR_MESSAGES.DOCUMENT_NOT_FOUND);
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

  async deleteDocument(userId: string, subjectId: string, filename: string) {
    const subject = await this.subjectService.findSubjectById(
      userId,
      subjectId,
    );

    const documentIndex = subject.documents.findIndex(
      (document) => document === filename,
    );

    if (documentIndex === -1)
      throw new NotFoundException(ERROR_MESSAGES.DOCUMENT_NOT_FOUND);

    try {
      const filePath = this.getFilePath(filename);

      await fs.unlink(filePath);

      subject.documents.splice(documentIndex, 1);

      await subject.save();
    } catch (e) {
      throw new InternalServerErrorException(
        ERROR_MESSAGES.FAILED_TO_DELETE_DOCUMENT,
      );
    }
  }
}
