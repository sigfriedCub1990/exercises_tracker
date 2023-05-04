import { HydratedDocument } from "mongoose";

import models from "../models";
import { IExercise } from "../models/exercise";
import { IUser } from "../models/user";

export default function (user: HydratedDocument<IUser>) {
  let logs: Array<IExercise | undefined> = [];
  if (user?.log?.length) {
    logs = user.log.map((exercise) => {
      if (exercise instanceof models.Exercise) {
        return {
          description: exercise.description,
          duration: exercise.duration,
          date: exercise.date,
        };
      }
    });
  }

  return logs;
}
