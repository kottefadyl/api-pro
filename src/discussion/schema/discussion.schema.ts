import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Schema as MongooseSchema } from "mongoose";
import { User } from "src/auth/schema/user.schema";
import { Message } from "src/message/schema/message.schema";

export type discusDocument = Discus & Document;

@Schema({
    timestamps: true
})
export class Discus {
  
    @Prop({
        type: [{ type: MongooseSchema.Types.ObjectId, ref: "User" }],
        validate: {
            validator: function (value: mongoose.Types.ObjectId[]) {
                return value.length <= 2; // Validates that the array length is less than or equal to 2
            },
            message: "The 'personnes' array can only contain a maximum of 2 users."
        }
    })
    personnes: User[];
}

export const DiscusSchema = SchemaFactory.createForClass(Discus);
