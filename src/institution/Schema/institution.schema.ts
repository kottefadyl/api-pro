import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Domaine } from '../../domaine/schema/domaine.schema';  // Importez le schéma Domaine
import { User } from '../../auth/schema/user.schema';        // Importez le schéma User

export type InstitutionDocument = Institution & Document;

@Schema()
export class Institution {
  
  @Prop()
  name: string;

  @Prop({ default: Date.now })
  dateCreation: Date;  // Ajout du champ dateCreation avec une valeur par défaut

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' }) 
  byUser: User;
  
  @Prop()
  description: string;

  @Prop()
  institutionImg: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Domaine' }] })
  domaineIn: Domaine[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  usersIn: User[];
  
}

export const InstitutionSchema = SchemaFactory.createForClass(Institution);
