import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

import { Types } from 'mongoose';

@Schema()
export class Exam {
  @Prop({ required: true, trim: true, minlength: 2 })
  title: string;

  @Prop({ required: true })
  date: Date;

  _id: Types.ObjectId;
}

export const ExamSchema = SchemaFactory.createForClass(Exam);
