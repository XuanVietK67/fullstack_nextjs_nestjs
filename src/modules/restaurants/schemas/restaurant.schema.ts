import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RestaurantsDocument = HydratedDocument<Restaurants>;

@Schema()
export class Restaurants {
    @Prop()
    id: string;

    @Prop()
    name: string;

    @Prop()
    address: string;

    @Prop()
    phone: string;

    @Prop()
    email: string;

    @Prop()
    rating: string;
}

export const RestaurantsSchema = SchemaFactory.createForClass(Restaurants);