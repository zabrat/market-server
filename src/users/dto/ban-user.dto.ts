import { ObjectId } from 'mongoose';

export class BanUserDto {
  readonly banReason: string;
  readonly userId: ObjectId;
}
