import { Schema, model } from 'mongoose';
import { IClient } from '../interface/client.interface';

const ClientSchema = new Schema(
  {
    name: String,
    email: String,
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    invoices: [{ type: Schema.Types.ObjectId, ref: 'Invoice' }],
  },
  { timestamps: true },
);

export default model<IClient>('Client', ClientSchema);
