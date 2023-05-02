import { userDb } from "../../src/data-access";

describe("Data access layer tests for Person", () => {
  afterEach(async () => await userDb.removeMany({}));

  it("should insert a person", async () => {
    await userDb.insert({
      username: "the_cr0w",
    });

    expect(await userDb.find({})).toHaveLength(1);
  });

  it("should find a person given its username", async () => {
    await userDb.insert({
      username: "the_cr0w",
    });

    expect(await userDb.find({ username: "the_cr0w" })).toHaveLength(1);
  });

  it("should find a person given its _id", async () => {
    const person = await userDb.insert({
      username: "the_cr0w",
    });

    expect(await userDb.findOne({ _id: person._id.toString() })).toMatchObject({
      username: "the_cr0w",
      id: person._id.toString(),
    });
  });

  it("should remove a person given its _id", async () => {
    const person = await userDb.insert({
      username: "the_cr0w",
    });

    expect(await userDb.removeById(person._id.toString())).toMatchObject({
      id: expect.any(String),
      username: expect.any(String),
    });
  });
});
