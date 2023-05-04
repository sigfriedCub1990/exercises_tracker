import { HydratedDocument } from "mongoose";

import models from "../models";
import { IUser } from "../models/user";

interface Log {
  description: string;
  duration: number;
  date: string | undefined;
}

export default function (user: HydratedDocument<IUser>) {
  let logs: Array<Log | undefined> = [];
  if (user?.log?.length) {
    logs = user.log.map((exercise) => {
      if (exercise instanceof models.Exercise) {
        return {
          description: exercise.description,
          duration: exercise.duration,
          date: exercise.date?.toDateString(),
        };
      }
    });
  }

  return logs;
}
