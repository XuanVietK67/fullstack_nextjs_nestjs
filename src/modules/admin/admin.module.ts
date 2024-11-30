import { Module } from '@nestjs/common';
import { AdminService } from '@module/admin/admin.service';
import { AdminController } from '@module/admin/admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from '@module/admin/schemas/admin.schema';
import { User, UserSchema } from '@module/users/schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Admin.name, schema: AdminSchema },
    { name: User.name, schema: UserSchema }
  ])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
