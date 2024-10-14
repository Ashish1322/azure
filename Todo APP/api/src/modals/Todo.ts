import mongoose, { Schema, Document } from "mongoose";

interface ITodo extends Document {
  title: String;
  desc: String;
  completed: Boolean;
}
const TodoSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.model<ITodo>("TodoModels", TodoSchema);
export default Todo;
