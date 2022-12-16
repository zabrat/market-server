import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { User } from 'src/users/user.schema';

export type RoleDocument = HydratedDocument<Role>;

@Schema()
export class Role {
  _id: ObjectId;

  @ApiProperty({ example: 'ADMIN', description: 'role value' })
  @Prop({ type: String, required: true, unique: true })
  value: string;

  @ApiProperty({ example: 'administrator', description: 'role description' })
  @Prop({ type: String })
  description: string;

  @ApiProperty({ example: 'users', description: 'user which have this role' })
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User ' }] })
  users: User[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
