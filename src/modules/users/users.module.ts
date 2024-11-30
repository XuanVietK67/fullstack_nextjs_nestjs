import { Module } from '@nestjs/common';
import { UsersService } from '@module/users/users.service';
import { UsersController } from '@module/users/users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@module/users/schemas/user.schema';
import { Admin, AdminSchema } from '@module/admin/schemas/admin.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: User.name, schema: UserSchema },
    { name: Admin.name, schema: AdminSchema }
  ])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule { }
