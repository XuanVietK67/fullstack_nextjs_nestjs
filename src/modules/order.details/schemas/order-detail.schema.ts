import { MenuItemOption } from '@/modules/menu.item.options/schemas/menu-item-option.schema';
import { MenuItem } from '@/modules/menu.items/schemas/menu-item.schema';
import { Orders } from '@/modules/orders/schemas/order.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type OrderDetailDocument = HydratedDocument<OrderDetail>;

@Schema()
export class OrderDetail {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Orders.name })
    order: mongoose.Schema.Types.ObjectId;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: MenuItem.name })
    menuitem: mongoose.Schema.Types.ObjectId;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: MenuItemOption.name })
    menuitemoption: mongoose.Schema.Types.ObjectId;
    @Prop()
    id: string;
    @Prop()
    menu_id: string;
    @Prop()
    menu_item_id: string;
    @Prop()
    menu_item_option_id: string;
}

export const OrderDetailSchema = SchemaFactory.createForClass(OrderDetail);
