import { User } from 'src/auth/schema/user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Modulo } from 'src/modulo/entities/modulo.entity';
import { Domaine } from 'src/domaine/schema/domaine.schema';
import { Institution } from 'src/institution/schema/institution.schema';


export type FormationDocument = Formation & Document

@Schema()
export class Formation {
  @Prop()
  intituler: string;

  @Prop()
  description: string
 
  @Prop({default: Date.now})
  dateCreation: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Domaine' })
  inDomaine: Domaine;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Institution' })
  inInstitut: Institution;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  byUser: User;
}

export const FormationSchema = SchemaFactory.createForClass(Formation);
