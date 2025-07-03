import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 } from 'uuid';
import { Holding, HoldingSchema } from './holdings.schema';

@Schema({ _id: true })
export class Account extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [HoldingSchema], default: [] })
  holdings: Holding[];

  @Prop({ required: true, unique: true, default: () => v4() })
  uuid: string;

  @Prop({ required: false, unique: false, default: () => v4() })
  username: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);

AccountSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, schema: Account) => {
    return {
      email: schema.email,
      holdings: schema.holdings,
    };
  },
});
