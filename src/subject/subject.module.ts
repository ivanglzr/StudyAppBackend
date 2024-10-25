import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { SubjectController } from './subject.controller';
import { SubjectService } from './subject.service';

import {
  Subject,
  SubjectSchema,
} from 'src/common/schemas/subject/subject.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Subject.name, schema: SubjectSchema }]),
  ],
  controllers: [SubjectController],
  providers: [SubjectService],
})
export class SubjectModule {}
