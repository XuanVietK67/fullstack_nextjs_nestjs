import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '@module/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LikesModule } from '@module/likes/likes.module';
import { MenuModule } from '@module/menu/menu.module';
import { MenuItemOptionsModule } from '@module/menu.item.options/menu-item-options.module';
import { MenuItemsModule } from '@module/menu.items/menu-items.module';
import { OrderDetailsModule } from '@module/order.details/order-details.module';
import { OrdersModule } from '@module/orders/orders.module';
import { RestaurantsModule } from '@module/restaurants/restaurants.module';
import { ReviewsModule } from '@module/reviews/reviews.module';
import { AuthModule } from '@/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/passport/jwt-auth.guard';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, }),
    UsersModule,
    LikesModule,
    MenuModule,
    MenuItemOptionsModule,
    MenuItemsModule,
    OrderDetailsModule,
    OrdersModule,
    RestaurantsModule,
    ReviewsModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    AuthModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule { }
