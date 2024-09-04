import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { User } from "src/auth/schema/user.schema";
import { Discus } from "src/discussion/schema/discussion.schema";

export type messageDocument = Message & Document;

@Schema(
    { timestamps: true}
)
export class Message extends Document{

    @Prop()
    text: string;

    @Prop()
    file:string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    sender: User;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    reciver: User;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Discus' })
    discus: Discus;
}

export const MessageSchema = SchemaFactory.createForClass(Message);