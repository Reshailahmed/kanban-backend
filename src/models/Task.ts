import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  id: string;
  title: string;
  description: string;
  status: string; // Corresponds to column ID
}

const TaskSchema: Schema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true },
});

export const Task = mongoose.model<ITask>("Task", TaskSchema);
