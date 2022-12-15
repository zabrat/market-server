import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';
import { Role } from 'src/roles/role.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @ApiProperty({ example: 'zasdf@mail.ru', description: 'email' })
  @Prop({ type: String, required: true, unique: true })
  email: string;

  @ApiProperty({ example: '5333', description: 'password' })
  @Prop({ type: String, required: true })
  password: string;

  @ApiProperty({ example: 'true', description: 'is user banned' })
  @Prop({ type: Boolean, default: false })
  banned: boolean;

  @ApiProperty({ example: 'spam', description: 'ban reason' })
  @Prop({ type: String })
  banReason: string;

  @ApiProperty({ example: 'roles', description: 'roles which have this user' })
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }] })
  roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
