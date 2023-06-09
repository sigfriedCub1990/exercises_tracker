import { HydratedDocument } from "mongoose";

import buildLogs from "../../lib/build-logs";
import { userDb } from "../../data-access";
import { IUser } from "src/models/user";

export default async function (_id: string) {
  try {
    const user = await userDb.findOne({ _id }, { populate: { path: "log" } });

    const logs = buildLogs(user as HydratedDocument<IUser>);

    return {
      _id: user?._id,
      count: logs.length,
      username: user?.username,
      log: logs,
    };
  } catch (error) {
    console.error(error);
  }
}
