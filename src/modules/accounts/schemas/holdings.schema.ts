import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from './transactions.schema';

@Schema({ _id: false })
export class Holding {
  @Prop({ required: true })
  symbol: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  icon: string;

  @Prop({ type: [TransactionSchema], default: [] })
  transactions: Transaction[];
}

export const HoldingSchema = SchemaFactory.createForClass(Holding);
