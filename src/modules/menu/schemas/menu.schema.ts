import { Restaurants } from '@/modules/restaurants/schemas/restaurant.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type MenuDocument = HydratedDocument<Menu>;

@Schema()
export class Menu {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Restaurants.name })
    restaurants: mongoose.Schema.Types.ObjectId
    @Prop()
    id: string;
    @Prop()
    restaurant_id: string;
    @Prop()
    title: string;
    @Prop()
    description: string;
    @Prop()
    image:string;
}

export const MenuSchema = SchemaFactory.createForClass(Menu);
