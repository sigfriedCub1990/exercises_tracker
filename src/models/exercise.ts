import { Schema } from "mongoose";

interface IExercise {
  description: string;
  duration: number;
  date?: string;
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
    type: Date,
    default: Date.now(),
  },
});

export { exerciseSchema as default, IExercise };
