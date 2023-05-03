import supertest from "supertest";

import app from "../../src/app";
import { userDb } from "../../src/data-access";

describe("API tests", () => {
  it("should have CORS enabled", async () => {
    const response = await supertest(app).get("/api/whoami");

    expect(Object.keys(response.headers)).toContain(
      "access-control-allow-origin"
    );
  });

  describe("when requesting /api/users", () => {
    afterEach(async () => await userDb.removeMany({}));

    describe("when POST to /api/users", () => {
      it("should create a new user", async () => {
        const response = await supertest(app)
          .post("/api/users")
          .send("username=pandushki");

        expect(response.body).toContainAllKeys(["_id", "username"]);
      });
    });

    describe("when GET to /api/users", () => {
      beforeAll(async () => {
        await Promise.all([
          userDb.insert({ username: "bob" }),
          userDb.insert({ username: "alice" }),
        ]);
      });

      it("should return an array of users", async () => {
        const response = await supertest(app).get("/api/users");

        expect(response.body).toHaveLength(2);
        expect(response.body[0]).toContainAllKeys(["_id", "username"]);
      });
    });
  });

  describe("when requesting /api/users/:_id/exercises", () => {
    it.todo("should return user with exercise field");
  });

  describe("when requesting /api/users/:_id/logs", () => {
    it.todo("should return user with log array field with all exercises in it");
    it.todo("should return log when filtering parameters are provided");
  });
});
