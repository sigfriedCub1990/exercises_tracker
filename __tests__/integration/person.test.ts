import { personDb } from "../../src/data-access";

describe("Data access layer tests for Person", () => {
  afterEach(async () => await personDb.removeMany({}));

  it("should insert a person", async () => {
    await personDb.insert({
      username: "the_cr0w",
    });

    expect(await personDb.find({})).toHaveLength(1);
  });

  it("should find a person given its username", async () => {
    await personDb.insert({
      username: "the_cr0w",
    });

    expect(await personDb.find({ username: "the_cr0w" })).toHaveLength(1);
  });

  it("should find a person given its _id", async () => {
    const person = await personDb.insert({
      username: "the_cr0w",
    });

    expect(await personDb.findById(person._id.toString())).toMatchObject({
      username: "the_cr0w",
      id: person._id.toString(),
    });
  });

  it("should remove a person given its _id", async () => {
    const person = await personDb.insert({
      username: "the_cr0w",
    });

    expect(await personDb.removeById(person._id.toString())).toMatchObject({
      id: expect.any(String),
      username: expect.any(String),
    });
  });
});
