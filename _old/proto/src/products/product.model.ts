import * as mongoose from 'mongoose';
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";

@Schema()
export class Product extends Document {
    @Prop({ required: true, trim: true })
    title: string;

    @Prop({ required: true, trim: true })
    description: string

    @Prop({ required: true, min: [0, 'Must be a positive number'] })
    price: number;
}


export const ProductSchema = SchemaFactory.createForClass(Product);
