import { userDb } from "../../src/data-access";

describe("Data access layer tests for User", () => {
  it("should insert a user", async () => {
    await userDb.insert({
      username: "the_cr0w",
    });

    expect(await userDb.find({})).toHaveLength(1);
  });

  it("should find a user given its username", async () => {
    await userDb.insert({
      username: "the_cr0w",
    });

    expect(
      await userDb.findOne({ username: "the_cr0w" })
    ).not.toBeEmptyObject();
  });

  it("should find a user given its _id", async () => {
    const user = await userDb.insert({
      username: "the_cr0w",
    });

    expect(await userDb.findOne({ _id: user._id.toString() })).toMatchObject({
      username: "the_cr0w",
      id: user._id.toString(),
    });
  });

  it("should remove a user given its _id", async () => {
    const user = await userDb.insert({
      username: "the_cr0w",
    });

    expect(await userDb.removeById(user._id.toString())).toMatchObject({
      id: expect.any(String),
      username: expect.any(String),
    });
  });
});
