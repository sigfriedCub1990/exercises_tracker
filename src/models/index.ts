import { model } from "mongoose";

import exerciseSchema, { IExercise } from "./exercise";
import userSchema, { IUser } from "./user";

const models = {
  Exercise: model<IExercise>("Exercise", exerciseSchema),
  User: model<IUser>("User", userSchema),
};

export default models;
