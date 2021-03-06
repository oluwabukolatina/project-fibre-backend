import { Schema, model } from 'mongoose';
import { IUser } from '../interface/user.interface';

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    clients: [{ type: Schema.Types.ObjectId, ref: 'Client' }],
    invoices: [{ type: Schema.Types.ObjectId, ref: 'Invoice' }],
  },
  { timestamps: true },
);

export default model<IUser>('User', UserSchema);
