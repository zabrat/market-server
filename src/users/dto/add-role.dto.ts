import { ObjectId } from 'mongoose';

export class AddRoleDto {
  readonly role: string;
  readonly userId: ObjectId;
}
