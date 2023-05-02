import { Types } from "mongoose";

import { personDb } from "../../src/data-access";
import createExercise from "../../src/use-cases/exercises/create-exercise";

describe("Create Exercise use case tests", () => {
  afterEach(async () => personDb.removeMany({}));

  it("should create an Exercise an associate it to a User", async () => {
    const person = await personDb.insert({
      username: "the_cr0w",
    });

    const exercise = await createExercise(person._id, {
      duration: 60,
      description: "Running",
    });

    expect(exercise).toHaveProperty("username", expect.any(Types.ObjectId));
  });
});
