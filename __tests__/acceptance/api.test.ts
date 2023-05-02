import supertest from "supertest";

import app from "../../src/app";

describe("API tests", () => {
  it("should have CORS enabled", async () => {
    const response = await supertest(app).get("/api/whoami");

    expect(Object.keys(response.headers)).toContain(
      "access-control-allow-origin"
    );
  });

  describe("when requesting /api/users", () => {
    describe("when POST to /api/users", () => {
      it.todo("should create a new user");
    });

    describe("when GET to /api/users", () => {
      it.todo("should return an array of users");
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
