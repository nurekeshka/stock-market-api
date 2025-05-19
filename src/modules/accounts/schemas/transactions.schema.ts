import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Transaction {
  @Prop({ required: true })
  type: 'buy' | 'sell';

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  quantity: number;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
