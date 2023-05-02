import { IExercise } from "../../models/exercise";
import { exerciseDb } from "../../data-access/";
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

    return exercise;
  } catch (error) {
    console.log(error);
  }
}
