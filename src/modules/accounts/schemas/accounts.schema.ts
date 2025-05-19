import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Holding, HoldingSchema } from './holdings.schema';

@Schema()
export class Account extends Document {
  @Prop({ type: String, default: uuidv4, unique: true, index: true })
  uuid: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [HoldingSchema], default: [] })
  holdings: Holding[];
}

export const AccountSchema = SchemaFactory.createForClass(Account);

AccountSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, ret: Account) => {
    delete ret._id;
    delete ret.id;
  },
});
