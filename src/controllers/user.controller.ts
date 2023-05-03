import { Request, Response } from "express";
import createUser from "../use-cases/user/create-user";
import getUsers from "../use-cases/user/get-users";

const UserController = {
  createUser: async (req: Request, res: Response) => {
    const { username } = req.body;
    const user = await createUser({ username });

    return res.json(user);
  },

  getUsers: async (_req: Request, res: Response) => {
    const users = await getUsers();

    return res.json(users);
  },
};

export default UserController;
