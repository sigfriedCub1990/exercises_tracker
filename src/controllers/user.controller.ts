import { Request, Response } from "express";
import createUser from "../use-cases/user/create-user";

const UserController = {
  createUser: async (req: Request, res: Response) => {
    const { username } = req.body;
    const user = await createUser({ username });

    return res.json(user);
  },

  getUsers: async (req: Request, res: Response) => {},
};

export default UserController;
