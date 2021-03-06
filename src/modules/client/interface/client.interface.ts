import { Document } from 'mongoose';

export interface IClient extends Document {
  name: string;
  email: string;
  owner: string;
}
