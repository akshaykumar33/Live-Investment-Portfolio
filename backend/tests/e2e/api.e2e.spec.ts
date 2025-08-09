import http from "http";
import request from "supertest";
import app from "../../src/app";

let server: http.Server;

beforeAll((done) => {
  server = app.listen(5050, done);
});

afterAll((done) => {
  server.close(done);
});

describe("E2E Portfolio API", () => {
  it("should get summary", async () => {
    const res = await request(server).get("/api/portfolio/summary");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("totalInvestment");
  });
});
