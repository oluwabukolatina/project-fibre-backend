import { Schema, model } from 'mongoose';
import { IDummy } from '../interface/dummy.interface';

const DummySchema = new Schema(
  {
    dummy: String,
  },
  { timestamps: true },
);

export default model<IDummy>('Dummy', DummySchema);
