import { Request, Response } from "express";
import createUser from "../use-cases/user/create-user";
import getUsers from "../use-cases/user/get-users";
import createExercise from "../use-cases/exercises/create-exercise";
import { Types } from "mongoose";

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
};

export default UserController;
