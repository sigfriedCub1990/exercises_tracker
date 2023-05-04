import getLog from "../../../src/use-cases/user/get-log";
import { userDb, exerciseDb } from "../../../src/data-access";
import { Types } from "mongoose";

describe("Get Log use case tests", () => {
  it("should return a User with all its exercises", async () => {
    const user = await userDb.insert({ username: "the_cr0w" });
    const [exercise1, exercise2] = await Promise.all([
      exerciseDb.insert({
        username: user._id,
        description: "Running",
        duration: 60,
      }),
      exerciseDb.insert({
        username: user._id,
        description: "Jogging",
        duration: 50,
      }),
    ]);
    await userDb.update(
      { _id: user._id },
      { log: [exercise1._id, exercise2._id] }
    );

    const actual = await getLog(user._id.toString());

    expect(actual).toMatchObject({
      _id: expect.any(Types.ObjectId),
      username: expect.any(String),
      count: expect.any(Number),
      log: expect.any(Array),
    });
  });
});
