import { Request, Response } from "express";
import { Types } from "mongoose";

import createUser from "../use-cases/user/create-user";
import getUsers from "../use-cases/user/get-users";
import createExercise from "../use-cases/exercises/create-exercise";
import getLog from "../use-cases/user/get-log";
import getLogWithLimit from "../use-cases/user/get-log-with-limit";

import FilterBuilder from "../lib/filter-builder";

const UserController = {
  createUser: async (req: Request, res: Response) => {
    const { username } = req.body;
    const user = await createUser({ username });

    return res.json(user);
  },

  createExercise: async (req: Request, res: Response) => {
    const { _id } = req.params;
    const { description, duration, date } = req.body;

    const exercise = await createExercise(new Types.ObjectId(_id), {
      description,
      duration,
      date,
    });

    return res.json(exercise);
  },

  getUsers: async (_req: Request, res: Response) => {
    const users = await getUsers();

    return res.json(users);
  },

  getUserLogs: async (req: Request, res: Response) => {
    const { _id } = req.params;
    const { from, to, limit } = req.query;

    let userLogs;
    if (from || to || limit) {
      const filter = new FilterBuilder(
        from as string,
        to as string,
        limit as string
      );
      userLogs = await getLogWithLimit(_id, filter.build());
    } else {
      userLogs = await getLog(_id);
    }

    return res.json(userLogs);
  },
};

export default UserController;
