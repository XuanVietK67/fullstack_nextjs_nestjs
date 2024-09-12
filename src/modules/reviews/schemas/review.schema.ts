import { Restaurants } from '@/modules/restaurants/schemas/restaurant.schema';
import { User } from '@/modules/users/schemas/user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ReviewsDocument = HydratedDocument<Reviews>;

@Schema()
export class Reviews {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Restaurants.name })
  restaurants: mongoose.Schema.Types.ObjectId

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  users: mongoose.Schema.Types.ObjectId

  @Prop()
  id: string;

  @Prop()
  restaurant_id: string;

  @Prop()
  user_id: string;

  @Prop()
  rating: string;

  @Prop()
  comment: string;

  @Prop()
  image: string;

  @Prop()
  create_at: string;

}

export const ReviewsSchema = SchemaFactory.createForClass(Reviews);