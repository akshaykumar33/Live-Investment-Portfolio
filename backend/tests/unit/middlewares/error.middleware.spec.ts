import { errorMiddleware } from "../../../src/middlewares/error.middleware";

describe("Error Middleware", () => {
  it("returns 500", () => {
    const err = new Error("Oops");
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    errorMiddleware(err, {} as any, res, jest.fn());
    expect(res.status).toHaveBeenCalledWith(500);
  });
});
