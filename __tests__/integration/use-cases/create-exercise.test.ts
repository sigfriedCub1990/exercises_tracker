import { userDb } from "../../../src/data-access";
import createExercise from "../../../src/use-cases/exercises/create-exercise";

describe("Create Exercise use case tests", () => {
  describe("when date parameter is not provided", () => {
    it("should create an Exercise with a default date", async () => {
      const person = await userDb.insert({
        username: "the_cr0w",
      });

      const exercise = await createExercise(person._id, {
        duration: 60,
        description: "Running",
      });

      expect(exercise).toContainAllKeys([
        "_id",
        "username",
        "description",
        "duration",
        "date",
      ]);
    });
  });
});
