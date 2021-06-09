import { Document } from 'mongoose';

export interface IInvoice extends Document {
  name: string;
  paid: boolean;
  client: string;
  user: string;
}
