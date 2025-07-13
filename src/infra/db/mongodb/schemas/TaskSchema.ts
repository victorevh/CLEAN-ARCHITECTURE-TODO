import { Schema, model, Document } from "mongoose";

export interface ITask extends Document {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema<ITask>({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: false, default: "" },
  completed: { type: Boolean, required: true, default: false },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
});

export const TaskModel = model<ITask>("Task", TaskSchema);
