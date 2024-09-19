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
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
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
    AuthModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          // host: "smtp.gmail.com",
          host: configService.get<string>('EMAIL_HOST'),
          port: configService.get<number>('EMAIL_PORT'),
          secure: true,
          // ignoreTLS: true,
          // secure: false,
          auth: {
            user: configService.get<string>('MAIL_USER'),
            pass: configService.get<string>('MAIL_PASSWORD'),
          },
        },
        defaults: {
          from: '"No Reply" <no-reply@localhost>',
        },
        // preview: true,
        // template: {
        //   dir: process.cwd() + '/template/',
        //   adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        //   options: {
        //     strict: true,
        //   },
        // },
      }),
      inject: [ConfigService],

    }),
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
