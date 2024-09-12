import { MenuItem } from '@/modules/menu.items/schemas/menu-item.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type MenuItemOptionDocument = HydratedDocument<MenuItemOption>;

@Schema()
export class MenuItemOption {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: MenuItem.name })
    menuitem:mongoose.Schema.Types.ObjectId
    @Prop()
    id: string;
    @Prop()
    menu_item_id: string;
    @Prop()
    title: string;
    @Prop()
    additional_price: string;
    @Prop()
    optional_description: string;
}

export const MenuItemOptionSchema = SchemaFactory.createForClass(MenuItemOption);
