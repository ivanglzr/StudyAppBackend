import { Injectable, NotFoundException } from '@nestjs/common';

import { SubjectService } from 'src/subject/subject.service';

import { FlashcardDto } from './dto/flashcard.dto';
import { Flashcard } from 'src/common/schemas/subject/flashcard/flashcard.schema';

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

  async getFlashcard(userId: string, subjectId: string, flashcardId: string) {
    const { flashcards } = await this.subjectService.findSubjectById(
      userId,
      subjectId,
    );

    const flashcard = flashcards.find(
      (flashcard) => flashcard._id.toString() === flashcardId,
    );

    if (!flashcard) throw new NotFoundException('Flashcard not found');

    return flashcard;
  }

  async postFlashcard(
    userId: string,
    subjectId: string,
    flashcardDto: FlashcardDto,
  ) {
    const subject = await this.subjectService.findSubjectById(
      userId,
      subjectId,
    );

    const flashcard = flashcardDto as Flashcard;

    subject.flashcards.push(flashcard);

    await subject.save();
  }
}
