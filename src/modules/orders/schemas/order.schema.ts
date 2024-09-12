import { Restaurants } from '@/modules/restaurants/schemas/restaurant.schema';
import { User } from '@/modules/users/schemas/user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type OrdersDocument = HydratedDocument<Orders>;

@Schema()
export class Orders {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user:mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Restaurants.name })
  restaurants:mongoose.Schema.Types.ObjectId;

  @Prop()
  id: string;

  @Prop()
  user_id: string;

  @Prop()
  restaurant_id: string;
  @Prop()
  total_price: number;
  @Prop()
  status: string;
  @Prop()
  order_time: string;
  @Prop()
  delivery_time: string;
}

export const OrdersSchema = SchemaFactory.createForClass(Orders);