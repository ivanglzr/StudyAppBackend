import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Exam {
  @Prop({ required: true, trim: true, minlength: 2 })
  title: string;

  @Prop({ required: true })
  date: Date;
}

export const ExamSchema = SchemaFactory.createForClass(Exam);
