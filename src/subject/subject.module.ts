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
  controllers: [SubjectController],
  providers: [SubjectService],
})
export class SubjectModule {}
