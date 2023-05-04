import { IExercise } from "../../models/exercise";
import { exerciseDb, userDb } from "../../data-access/";
import { Types } from "mongoose";

export default async function (
  userId: Types.ObjectId,
  exerciseData: IExercise
) {
  try {
    if (exerciseData?.date) {
      exerciseData.date = new Date(exerciseData.date);
    }

    const exercise = await exerciseDb.insert({
      username: userId,
      ...exerciseData,
    });

    const user = await userDb.findOne({ _id: userId });

    const logs: Array<Types.ObjectId> = user?.log || [];
    logs.push(exercise._id);

    await userDb.update({ _id: user?._id }, { log: logs });

    return {
      _id: user?.id,
      username: user?.username,
      description: exercise?.description,
      duration: exercise?.duration,
      date: exercise?.date?.toDateString(),
    };
  } catch (error) {
    console.log(error);
  }
}
