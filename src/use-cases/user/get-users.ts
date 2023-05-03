import { userDb } from "../../data-access";

export default async function () {
  try {
    const users = await userDb.find({}, { select: ["_id", "username"] });

    return users;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
