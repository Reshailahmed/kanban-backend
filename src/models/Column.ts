import mongoose, { Schema, Document } from "mongoose";

export interface IColumn extends Document {
  id: string;
  title: string;
  isDefault: boolean;
}

const ColumnSchema: Schema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  isDefault: { type: Boolean, required: true },
});

export const Column = mongoose.model<IColumn>("Column", ColumnSchema);
