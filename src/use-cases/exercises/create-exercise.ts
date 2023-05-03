import { IExercise } from "../../models/exercise";
import { exerciseDb, userDb } from "../../data-access/";
import { Types } from "mongoose";

export default async function (
  userId: Types.ObjectId,
  exerciseData: IExercise
) {
  try {
    const exercise = await exerciseDb.insert({
      username: userId,
      ...exerciseData,
    });

    const user = await userDb.findOne({ _id: userId });

    return {
      _id: exercise?._id,
      username: user?.username,
      description: exercise?.description,
      duration: exercise?.duration,
      date: exercise?.date,
    };
  } catch (error) {
    console.log(error);
  }
}
