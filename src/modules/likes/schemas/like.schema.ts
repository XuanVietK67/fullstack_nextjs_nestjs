import { Restaurants } from '@/modules/restaurants/schemas/restaurant.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type LikeDocument = HydratedDocument<Like>;

@Schema()
export class Like {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Restaurants.name })
    restaurant: mongoose.Schema.Types.ObjectId;
    @Prop()
    id: string;

    @Prop()
    restaurant_id: string;
}

export const LikeSchema = SchemaFactory.createForClass(Like);
