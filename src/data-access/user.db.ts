import { Model, FilterQuery, PopulateOptions } from "mongoose";
import { IUser } from "../models/user";

interface Options {
  populate?: PopulateOptions;
  sort?: string;
  select?: Array<string>;
  limit?: number;
}

export default function makeUserDb({ User }: { User: Model<IUser> }) {
  async function insert(personData: IUser) {
    const person = new User(personData);

    return person.save();
  }

  async function findOne(filter: FilterQuery<IUser>, options: Options = {}) {
    const { populate, sort, limit } = options;
    const query = User.findOne(filter);

    if (sort) query.sort(sort);
    if (limit) query.limit(limit);
    if (populate) query.populate(populate);

    return query.exec();
  }

  async function find(filter: FilterQuery<IUser>, options: Options = {}) {
    const { populate, sort, select } = options;
    const query = User.find(filter);

    if (sort) query.sort(sort);
    if (select) query.select(select);
    if (populate) query.populate(populate);

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
