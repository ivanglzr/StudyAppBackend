import {
  Controller,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';

import { DocumentService } from './document.service';

import { AuthGuard } from 'src/common/guards/auth.guard';

import { Id } from 'src/common/decorators/id.decorator';

import { ValidateIdPipe } from 'src/common/pipes/validate-id.pipe';

import { multerStorage } from './config';

import { subjectIdParamName } from '../config';

import { DOCUMENT_ROUTES } from 'src/common/routes';

@Controller(DOCUMENT_ROUTES.BASE)
@UseGuards(AuthGuard)
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file0', {
      storage: multerStorage,
    }),
  )
  async uploadDocument(
    @Id() userId: string,
    @Param(subjectIdParamName, ValidateIdPipe) subjectId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    await this.documentService.postDocument(userId, subjectId, file.filename);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Document uploaded',
    };
  }
}
