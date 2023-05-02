import { model } from "mongoose";

import exerciseSchema, { IExercise } from "./exercise";
import personSchema, { IPerson } from "./person";

const models = {
  Exercise: model<IExercise>("Exercise", exerciseSchema),
  Person: model<IPerson>("Person", personSchema),
};

export default models;
