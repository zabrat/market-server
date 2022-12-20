import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

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

  async addRole(dto: AddRoleDto) {
    const user = await this.userModel.findById(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.role);

    if (role && user) {
      await user.updateOne({ $addToSet: { roles: role._id } });
      await user.save();
      return user;
    }
    throw new HttpException(
      'User or role were not found',
      HttpStatus.NOT_FOUND,
    );
  }

  async banUser(dto: BanUserDto) {
    const user = await this.userModel.findById(dto.userId);
    if (user) {
      user.banned = true;
      user.banReason = dto.banReason;
      await user.save();

      return user;
    }
    throw new HttpException('User was not found', HttpStatus.NOT_FOUND);
  }
}
