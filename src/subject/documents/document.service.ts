import * as fs from 'node:fs/promises';
import * as path from 'node:path';

import { Injectable } from '@nestjs/common';

import { SubjectService } from '../subject.service';

import { documentsDestination } from './config';

@Injectable()
export class DocumentService {
  constructor(private readonly subjectService: SubjectService) {}

  async deleteFile(filename: string) {
    try {
      const filePath = path.join(process.cwd(), documentsDestination, filename);

      console.log(filePath);

      await fs.unlink(filePath);
    } catch (e) {}
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
