import { HydratedDocument } from "mongoose";

import { userDb } from "../../data-access";
import buildLogs from "../../lib/build-logs";
import { IUser } from "src/models/user";

interface Filters {
  match?: unknown;
}

export default async function (_id: string, filters: Filters = {}) {
  try {
    const user = await userDb.findOne(
      { _id },
      { populate: { path: "log", ...filters } }
    );

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
