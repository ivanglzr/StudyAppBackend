import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { FlashcardService } from './flashcard.service';

import { AuthGuard } from 'src/common/guards/auth.guard';

import { Id } from 'src/common/decorators/id.decorator';

import { ValidateIdPipe } from 'src/common/pipes/validate-id.pipe';

import { FlashcardDto } from './dto/flashcard.dto';

import { subjectIdParamName } from '../config';

import { FLASHCARD_ROUTES } from 'src/common/routes';

@Controller(FLASHCARD_ROUTES.BASE)
@UseGuards(AuthGuard)
export class FlashcardController {
  constructor(private readonly flashcardService: FlashcardService) {}

  @Get()
  async getFlashcards(
    @Id() userId: string,
    @Param(subjectIdParamName, ValidateIdPipe) subjectId: string,
  ) {
    const flashcards = await this.flashcardService.getFlashcards(
      userId,
      subjectId,
    );

    const message =
      flashcards.length === 0
        ? "There isn't any flashcards"
        : 'Flashcards found';

    return {
      statusCode: HttpStatus.OK,
      message,
      flashcards,
    };
  }

  @Post()
  async postFlashcard(
    @Id() userId: string,
    @Param(subjectIdParamName, ValidateIdPipe) subjectId: string,
    @Body() flashcardDto: FlashcardDto,
  ) {
    await this.flashcardService.postFlashcard(userId, subjectId, flashcardDto);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Flashcard created',
    };
  }
}
