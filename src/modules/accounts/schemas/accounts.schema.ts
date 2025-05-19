import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Holding, HoldingSchema } from './holdings.schema';

@Schema()
export class Account extends Document {
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
