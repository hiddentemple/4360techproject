import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";


@Schema()
export class User extends Document {
    @Prop({required: true, trim: true, minlength: 5, unique: true})
    username: string;

    @Prop({ required: true })
    passwordHash: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
