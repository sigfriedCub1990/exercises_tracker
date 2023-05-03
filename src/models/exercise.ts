import { Schema, Types } from "mongoose";

interface IExercise {
  description: string;
  duration: number;
  date?: Date;
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
    type: Date,
    default: new Date(),
  },
  username: { type: Schema.Types.ObjectId, ref: "User" },
});

export { exerciseSchema as default, IExercise };
