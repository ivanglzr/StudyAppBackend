import * as mongoose from 'mongoose';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

import { Subject } from 'src/common/schemas/subject/subject.schema';

import { ISubjectStats } from '@study-app/types';

@Schema({ _id: false })
export class SubjectStats implements ISubjectStats {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Subject.name,
    required: true,
  })
  subjectId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  studyTime: number;
}

export const SubjectStatsSchema = SchemaFactory.createForClass(SubjectStats);

SubjectStatsSchema.virtual('subject', {
  ref: Subject.name,
  localField: 'subjectId',
  foreignField: '_id',
  justOne: true,
});

const options = {
  virtuals: true,
};

SubjectStatsSchema.set('toJSON', options);
SubjectStatsSchema.set('toObject', options);
