import { Types } from "mongoose";

import { userDb } from "../../src/data-access";
import createExercise from "../../src/use-cases/exercises/create-exercise";

describe("Create Exercise use case tests", () => {
  afterEach(async () => userDb.removeMany({}));

  it("should create an Exercise an associate it to a User", async () => {
    const person = await userDb.insert({
      username: "the_cr0w",
    });

    const exercise = await createExercise(person._id, {
      duration: 60,
      description: "Running",
    });

    expect(exercise).toHaveProperty("username", expect.any(Types.ObjectId));
  });
});
