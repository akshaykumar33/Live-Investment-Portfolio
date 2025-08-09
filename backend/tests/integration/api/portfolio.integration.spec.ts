import request from "supertest";
import app from "../../../src/app";

describe("Portfolio Integration", () => {
  it("GET /api/portfolio", async () => {
    const res = await request(app).get("/api/portfolio");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});
