import { userDb } from "../../data-access";
import models from "../../models";
import { IExercise } from "src/models/exercise";

export default async function (_id: string) {
  try {
    const user = await userDb.findOne({ _id }, { populate: ["log"] });

    let logs: Array<IExercise | undefined> = [];
    if (user?.log && user.log.length) {
      logs = user.log.map((log) => {
        if (log instanceof models.Exercise) {
          return {
            description: log.description,
            duration: log.duration,
            date: log.date,
          } as IExercise;
        }
      });
    }

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
