import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Abomt } from "src/abomt/schema/abomt.schema";
import { Domaine } from "src/domaine/schema/domaine.schema";
import { Institution } from "../../institution/schema/institution.schema";
import { Formation } from "../../formation/schema/formation.shema";
import { Modulo } from "src/modulo/schema/modulo.schema";

export type UserDocument = User & Document;

@Schema({
    timestamps: true
})
export class User extends Document {

    @Prop()
    name: string;

    @Prop()
    firstname: string;

    @Prop({ unique: [true, "duplicate email entered"] })
    email: string;

    @Prop()
    password: string;

    @Prop({ default: false })
    isLogin: boolean;

    @Prop({ enum: ['professionel', 'standard'] })
    status: 'professionel' | 'standard';

    @Prop()
    profileImg: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Abomt' })
    abomt: Abomt;

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Formation' }])
    formationsAcheter: Formation[];

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Domaine' }])
    domaines: Domaine[];

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Modulo' }])
    modulosLiked: Modulo[]

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Institution' }])
    institutions: Institution[];

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }])
    isAbonnésof: User[];

}

export const UserSchema = SchemaFactory.createForClass(User);
