
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type AbomtDocument = Abomt & Document

@Schema()
export class Abomt {
  @Prop()
  intituler: string;

  @Prop()
  prix: number;

  @Prop()
  duree: number;

  @Prop()
  description: string
}

export const AbomtSchema = SchemaFactory.createForClass(Abomt);
