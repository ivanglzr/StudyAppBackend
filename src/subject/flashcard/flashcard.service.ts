import { Injectable } from '@nestjs/common';

import { SubjectService } from 'src/subject/subject.service';

@Injectable()
export class FlashcardService {
  constructor(private readonly subjectService: SubjectService) {}

  async getFlashcards(userId: string, subjectId: string) {
    const { flashcards } = await this.subjectService.findSubjectById(
      userId,
      subjectId,
    );

    return flashcards;
  }
}
