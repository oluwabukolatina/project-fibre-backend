import { Schema, model } from 'mongoose';
import { IInvoice } from '../interface/invoice.interface';

const InvoiceSchema = new Schema(
  {
    name: String,
    paid: { type: Boolean, default: false },
    amount: Number,
    description: String,
    client: { type: Schema.Types.ObjectId, ref: 'Client' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

export default model<IInvoice>('Invoice', InvoiceSchema);
