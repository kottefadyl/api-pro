import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { User } from "src/auth/schema/user.schema";
import { Formation } from "src/formation/schema/formation.shema";

export type ModuloDocument = Modulo & Document;

@Schema()
export class Modulo extends Document {
    @Prop({ required: true })
    titre: string;

    @Prop()
    description: string;

    @Prop({ default: true })
    etatActua: boolean;

    @Prop({ default: Date.now })
    dateCreation: Date;  // Ajout du champ dateCreation avec une valeur par défaut

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }])
    usersLike: User[];

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    byUser: User;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Formation' })
    formationId: Formation;
}

export const ModuloSchema = SchemaFactory.createForClass(Modulo);
