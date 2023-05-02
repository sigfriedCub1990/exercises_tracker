import { Model, FilterQuery } from "mongoose";
import { IPerson } from "src/models/person";

export default function makePersonDb({ Person }: { Person: Model<IPerson> }) {
  async function insert(personData: IPerson) {
    const person = new Person(personData);

    return person.save();
  }

  async function find(filter: FilterQuery<IPerson>) {
    const query = Person.find(filter);

    return query.exec();
  }

  async function findById(_id: string) {
    return Person.findById(_id).select("-__v");
  }

  async function removeMany(filter: FilterQuery<IPerson>) {
    return Person.deleteMany(filter);
  }

  async function removeById(_id: string) {
    return Person.findByIdAndDelete(_id).select("-__v").exec();
  }

  return {
    insert,
    find,
    findById,
    removeMany,
    removeById,
  };
}
