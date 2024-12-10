import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  phone: string;

  @Prop()
  address: string;
  
  @Prop()
  image: string;

  @Prop({default: "LOCAL"})
  account_type: string;

  @Prop({default: "USER"})
  role: string;

  @Prop({default: true})
  is_active: boolean;

  @Prop()
  code_id: string;
  
  @Prop()
  code_expired: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
