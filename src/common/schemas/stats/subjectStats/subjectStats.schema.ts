import * as mongoose from 'mongoose';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

import { Subject } from 'src/common/schemas/subject/subject.schema';

@Schema({ _id: false })
export class SubjectStats {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true,
  })
  subjectId: Subject | mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  studyTime: number;
}

export const SubjectStatsSchema = SchemaFactory.createForClass(SubjectStats);
