import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { FlashcardService } from './flashcard.service';

import { AuthGuard } from 'src/common/guards/auth.guard';

import { Id } from 'src/common/decorators/id.decorator';

import { ValidateIdPipe } from 'src/common/pipes/validate-id.pipe';

import { FlashcardDto } from './dto/flashcard.dto';

import { subjectIdParamName } from '../config';

import { FLASHCARD_ROUTES } from 'src/common/routes';

import { RESPONSE_MESSAGES } from 'src/common/messages';

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
        ? RESPONSE_MESSAGES.NO_FLASHCARDS_FOUND
        : flashcards.length === 1
          ? RESPONSE_MESSAGES.FLASHCARD_FOUND
          : RESPONSE_MESSAGES.FLASHCARDS_FOUND;

    return {
      statusCode: HttpStatus.OK,
      message,
      flashcards,
    };
  }

  @Get(':flashcardId')
  async getFlashcard(
    @Id() userId: string,
    @Param(subjectIdParamName, ValidateIdPipe) subjectId: string,
    @Param('flashcardId', ValidateIdPipe) flashcardId: string,
  ) {
    const flashcard = await this.flashcardService.getFlashcard(
      userId,
      subjectId,
      flashcardId,
    );

    return {
      status: HttpStatus.OK,
      message: RESPONSE_MESSAGES.FLASHCARD_FOUND,
      flashcard,
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
      message: RESPONSE_MESSAGES.FLASHCARD_CREATED,
    };
  }

  @Put(':flashcardId')
  async putFlashcard(
    @Id() userId: string,
    @Param(subjectIdParamName, ValidateIdPipe) subjectId: string,
    @Param('flashcardId', ValidateIdPipe) flashcardId: string,
    @Body() flashcardDto: FlashcardDto,
  ) {
    await this.flashcardService.putFlashcard(
      userId,
      subjectId,
      flashcardId,
      flashcardDto,
    );

    return {
      statusCode: HttpStatus.OK,
      message: RESPONSE_MESSAGES.FLASHCARD_EDITED,
    };
  }

  @Delete(':flashcardId')
  async deleteFlashcard(
    @Id() userId: string,
    @Param(subjectIdParamName, ValidateIdPipe) subjectId: string,
    @Param('flashcardId', ValidateIdPipe) flashcardId: string,
  ) {
    await this.flashcardService.deleteFlashcard(userId, subjectId, flashcardId);

    return {
      status: HttpStatus.OK,
      message: RESPONSE_MESSAGES.FLASHCARD_DELETED,
    };
  }
}
