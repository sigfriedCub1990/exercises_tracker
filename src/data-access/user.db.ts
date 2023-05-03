import { Model, FilterQuery } from "mongoose";
import { IUser } from "../models/user";
import { IExercise } from "..//models/exercise";
import * as r from "ramda";

// TODO:
// This probably could be improved by providing
// a union type of the possible fields that
// we can populate.
interface Options {
  populate?: [string];
  sort?: string;
}

export default function makeUserDb({ User }: { User: Model<IUser> }) {
  async function insert(personData: IUser) {
    const person = new User(personData);

    return person.save();
  }

  async function findOne(filter: FilterQuery<IUser>, options: Options = {}) {
    const { populate, sort } = options;
    const query = User.findOne(filter);
    if (sort) query.sort(sort);

    r.forEach(
      (p: string) => query.populate<{ p: Array<IExercise> }>(p),
      populate || []
    );

    return query.exec();
  }

  async function find(filter: FilterQuery<IUser>, options: Options = {}) {
    const { populate, sort } = options;
    const query = User.find(filter);
    if (sort) query.sort(sort);

    r.forEach(
      (p: string) => query.populate<{ p: Array<IExercise> }>(p),
      populate || []
    );

    return query.exec();
  }

  async function removeMany(filter: FilterQuery<IUser>) {
    return User.deleteMany(filter);
  }

  async function removeById(_id: string) {
    return User.findByIdAndDelete(_id).select("-__v").exec();
  }

  async function update(filter: FilterQuery<IUser>, userInfo: Partial<IUser>) {
    return User.findOneAndUpdate(filter, userInfo);
  }

  return {
    insert,
    findOne,
    find,
    removeMany,
    removeById,
    update,
  };
}
