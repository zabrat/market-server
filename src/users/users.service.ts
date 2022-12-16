import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private roleService: RolesService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new this.userModel(createUserDto);
    const role = await this.roleService.getRoleByValue('USER');
    user.$set('roles', [role]);

    return user.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().populate('roles').exec();
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).populate('roles').exec();
  }
}
