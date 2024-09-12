import { Module } from '@nestjs/common';
import { OrderDetailsService } from './order-details.service';
import { OrderDetailsController } from './order-details.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderDetail, OrderDetailSchema } from '@module/order.details/schemas/order-detail.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:OrderDetail.name,schema:OrderDetailSchema}])],
  controllers: [OrderDetailsController],
  providers: [OrderDetailsService],
})
export class OrderDetailsModule {}
