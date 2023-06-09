import supertest from "supertest";

import app from "../../src/app";
import { userDb } from "../../src/data-access";

describe("API tests", () => {
  it("should have CORS enabled", async () => {
    const response = await supertest(app).get("/api/users");

    expect(Object.keys(response.headers)).toContain(
      "access-control-allow-origin"
    );
  });

  describe("when requesting /api/users", () => {
    describe("when POST to /api/users", () => {
      it("should create a new user", async () => {
        const response = await supertest(app)
          .post("/api/users")
          .send({ username: "pandushki" });

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

  describe("when POST to /api/users/:_id/exercises", () => {
    describe("when date is not provided", () => {
      it("should return user with exercise field", async () => {
        const user = await userDb.insert({ username: "the_cr0w" });
        const response = await supertest(app)
          .post(`/api/users/${user._id}/exercises`)
          .send({ description: "Jogging", duration: 60 });

        expect(response.body).toContainAllKeys([
          "_id",
          "username",
          "description",
          "duration",
          "date",
        ]);
      });
    });

    describe("when date is provided in yyyy-mm-dd format", () => {
      it("should return user with exercise field", async () => {
        const user = await userDb.insert({ username: "the_cr0w" });
        const response = await supertest(app)
          .post(`/api/users/${user._id}/exercises`)
          .send({ description: "Jogging", duration: 60, date: "2019-04-27" });

        expect(response.body).toContainAllKeys([
          "_id",
          "username",
          "description",
          "duration",
          "date",
        ]);
      });
    });
  });

  describe("when requesting /api/users/:_id/logs", () => {
    it("should return user with log array field with all exercises in it", async () => {
      const testApp = supertest(app);
      const user = await userDb.insert({ username: "the_cr0w" });
      await testApp
        .post(`/api/users/${user._id}/exercises`)
        .send({ description: "Jogging", duration: 60 });
      await testApp
        .post(`/api/users/${user._id}/exercises`)
        .send({ description: "Running", duration: 50 });

      const response = await testApp.get(`/api/users/${user._id}/logs`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toContainAllKeys([
        "_id",
        "count",
        "username",
        "log",
      ]);
      expect(response.body.log).toHaveLength(2);
    });

    describe("when filters are provided", () => {
      it("should return 2 logs when limit is set to 2", async () => {
        const testApp = supertest(app);
        const user = await userDb.insert({ username: "the_cr0w" });
        await testApp
          .post(`/api/users/${user._id}/exercises`)
          .send({ description: "Jogging", duration: 60 });
        await testApp
          .post(`/api/users/${user._id}/exercises`)
          .send({ description: "Running", duration: 50 });
        await testApp
          .post(`/api/users/${user._id}/exercises`)
          .send({ description: "Meditate", duration: 60 });

        const response = await testApp.get(
          `/api/users/${user._id}/logs?limit=2`
        );

        expect(response.body).toContainAllKeys([
          "_id",
          "count",
          "username",
          "log",
        ]);
        expect(response.body.log).toHaveLength(2);
      });

      it("should return 1 log when from, to and limit are provided", async () => {
        const testApp = supertest(app);
        const user = await userDb.insert({ username: "the_cr0w" });
        await testApp
          .post(`/api/users/${user._id}/exercises`)
          .send({ description: "Jogging", duration: 60 });
        await testApp
          .post(`/api/users/${user._id}/exercises`)
          .send({ description: "Running", duration: 50 });
        await testApp
          .post(`/api/users/${user._id}/exercises`)
          .send({ description: "Meditate", duration: 60, date: "2019-04-27" });
        await testApp
          .post(`/api/users/${user._id}/exercises`)
          .send({ description: "Meditate", duration: 60, date: "2019-04-29" });

        const response = await testApp.get(
          `/api/users/${user._id}/logs?from=2019-01-31&to=2019-12-31&limit=1`
        );

        expect(response.body).toContainAllKeys([
          "_id",
          "count",
          "username",
          "log",
        ]);
        expect(response.body.log).toHaveLength(1);
      });
    });
  });
});
