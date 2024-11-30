import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAdminDto } from '@module/admin/dto/create-admin.dto';
import { UpdateAdminDto } from '@module/admin/dto/update-admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from '@module/admin/schemas/admin.schema';
import { Model } from 'mongoose';
import { User } from '@module/users/schemas/user.schema';
import { HashPassword } from '@/util/helper';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private AdminModel: Model<Admin>,
    @InjectModel(User.name) private UserModel: Model<Admin>
  ) { }


  async create(createAdminDto: CreateAdminDto) {
    const { email, password, name, image, phone, address } = createAdminDto
    const admin = await this.AdminModel.findOne({
      email
    })
    if (admin) {
      throw new BadRequestException(`${email} already exist`)
    }
    const hashPassword = await HashPassword(password)
    await this.UserModel.create({
      email, password: hashPassword, name, phone, address, image, is_admin: true
    })
    const res = await this.AdminModel.create({
      email, password: hashPassword, name, image, phone, address, role:'admin'
    })
    return res
  }

  findAll() {
    return `This action returns all admin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
