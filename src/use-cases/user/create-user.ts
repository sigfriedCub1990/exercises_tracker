import { IUser } from "../..//models/user";
import { userDb } from "../../data-access";

export default async function ({ username }: IUser) {
  try {
    if (!username) throw new Error("username is required");
    const user = await userDb.insert({ username });

    return {
      _id: user._id,
      username: user.username,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
