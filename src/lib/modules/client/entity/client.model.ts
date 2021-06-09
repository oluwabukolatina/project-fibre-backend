import { Schema, model } from 'mongoose';
import { IClient } from '../interface/client.interface';

const ClientSchema = new Schema(
  {
    name: String,
    email: String,
  },
  { timestamps: true },
);

export default model<IClient>('Client', ClientSchema);
