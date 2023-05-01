import supertest from "supertest";

import app from "../../src/app";

describe("API tests", () => {
  describe("when requesting /api/whoami", () => {
    it("should have CORS enabled", async () => {
      const response = await supertest(app).get("/api/whoami");

      expect(Object.keys(response.headers)).toContain(
        "access-control-allow-origin"
      );
    });

    it("should return JSON with headers information", async () => {
      const response = await supertest(app).get("/");

      expect(response.body).toMatchObject({
        message: "Hello, world!",
      });
    });

    it("should respond with status code 200", async () => {
      const response = await supertest(app).get("/");

      expect(response.statusCode).toBe(200);
    });
  });
});
