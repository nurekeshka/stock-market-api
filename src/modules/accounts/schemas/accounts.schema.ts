import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Holding, HoldingSchema } from './holdings.schema';

@Schema()
export class Account extends Document {
  @Prop({ required: true, unique: true })
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
  transform: (_, schema: Account) => {
    return {
      email: schema.email,
      username: schema.username,
      holdings: schema.holdings,
    };
  },
});
