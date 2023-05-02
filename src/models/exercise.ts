import { Schema, Types } from "mongoose";

interface IExercise {
  description: string;
  duration: number;
  date?: string;
  username?: Types.ObjectId;
}

const exerciseSchema = new Schema<IExercise>({
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    default: new Date().toDateString(),
  },
  username: { type: Schema.Types.ObjectId, ref: "Person" },
});

export { exerciseSchema as default, IExercise };
