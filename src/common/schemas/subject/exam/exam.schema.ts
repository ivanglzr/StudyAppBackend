import * as mongoose from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

import { examTitleMinLength } from './config';

import { IExam } from '@study-app/types';

@Schema()
export class Exam implements IExam {
  @Prop({ required: true, trim: true, minlength: examTitleMinLength })
  title: string;

  @Prop({ required: true })
  date: Date;

  _id: mongoose.Schema.Types.ObjectId;
}

export const ExamSchema = SchemaFactory.createForClass(Exam);
