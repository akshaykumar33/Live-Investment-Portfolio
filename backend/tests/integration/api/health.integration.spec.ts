import request from "supertest";
import app from "../../../src/app";

describe("Health Integration", () => {
  it("GET /api/health", async () => {
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
  });
});
