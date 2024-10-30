import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { ConfigModule, ConfigService } from '@nestjs/config';

import { JwtModule } from '@nestjs/jwt';

import { SubjectController } from './subject.controller';
import { SubjectService } from './subject.service';

import {
  Subject,
  SubjectSchema,
} from 'src/common/schemas/subject/subject.schema';

import { NoteController } from './note/note.controller';
import { NoteService } from './note/note.service';

import { ExamController } from './exam/exam.controller';
import { ExamService } from './exam/exam.service';

import { DocumentController } from './documents/document.controller';
import { DocumentService } from './documents/document.service';

import { ENVIROMENT_VARIABLES } from 'src/common/config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Subject.name, schema: SubjectSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>(ENVIROMENT_VARIABLES.JWT_KEY),
      }),
    }),
  ],
  controllers: [
    SubjectController,
    NoteController,
    ExamController,
    DocumentController,
  ],
  providers: [SubjectService, NoteService, ExamService, DocumentService],
})
export class SubjectModule {}
