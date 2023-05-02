import { FilterQuery, Model } from "mongoose";
import { IExercise } from "../models/exercise";

export default function makeExerciseDb({
  Exercise,
}: {
  Exercise: Model<IExercise>;
}) {
  async function insert(exerciseData: IExercise) {
    const exercise = new Exercise(exerciseData);

    return exercise.save();
  }

  async function find(filter: FilterQuery<IExercise>) {
    const query = Exercise.find(filter);

    return query.exec();
  }

  async function findById(_id: string) {
    return Exercise.findById(_id).select("-__v");
  }

  async function removeMany(filter: FilterQuery<IExercise>) {
    return Exercise.deleteMany(filter);
  }

  async function removeById(_id: string) {
    return Exercise.findByIdAndDelete(_id);
  }

  return {
    insert,
    find,
    findById,
    removeMany,
    removeById,
  };
}
