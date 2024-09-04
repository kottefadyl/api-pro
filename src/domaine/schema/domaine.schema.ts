import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, {Document} from "mongoose";
import { User } from "src/auth/schema/user.schema";
import { Institution } from "src/institution/schema/institution.schema";


export type DomaineDocument = Domaine & Document

@Schema({
    timestamps:true,
})
export class Domaine {
    @Prop({unique:[true, "cann't have to same intitule"]})
    intitule: string

    @Prop()
    prixDvF: number

    @Prop()
    prixAf: number

    @Prop()
    frequenceMaj: number

    @Prop()
    imgDomaine: string

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
    users: User[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Institution' }] })
    institutions: Institution[];
}

export const DomaineSchema = SchemaFactory.createForClass(Domaine)