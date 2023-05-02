import { exerciseDb } from "../../src/data-access";

describe("Data access layer tests for Exercise", () => {
  afterEach(async () => exerciseDb.removeMany({}));

  it("should insert an exercise", async () => {
    await exerciseDb.insert({
      description: "Running",
      duration: 60,
    });

    expect(await exerciseDb.find({})).toHaveLength(1);
  });

  it("should remove and exercise given its description", async () => {
    await exerciseDb.insert({
      description: "Running",
      duration: 60,
    });

    expect(await exerciseDb.find({ description: "Running" })).toHaveLength(1);
  });

  it("should remove and exercise given its _id", async () => {
    const exercise = await exerciseDb.insert({
      description: "Running",
      duration: 60,
    });

    expect(await exerciseDb.removeById(exercise._id.toString())).toMatchObject({
      id: expect.any(String),
    });
  });

  it("should find an exercise given its description", async () => {
    await exerciseDb.insert({
      description: "Running",
      duration: 60,
    });

    await exerciseDb.insert({
      description: "Jogging",
      duration: 60,
    });

    expect(await exerciseDb.find({ description: "Running" })).toHaveLength(1);
  });

  it("should find an exercise given its _id", async () => {
    const exercise = await exerciseDb.insert({
      description: "Running",
      duration: 60,
    });

    expect(await exerciseDb.findById(exercise._id.toString())).toMatchObject({
      id: expect.any(String),
      description: expect.any(String),
      date: expect.any(Date),
      duration: expect.any(Number),
    });
  });
});
