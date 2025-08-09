import { requestLogger } from "../../../src/middlewares/logger.middleware";
import logger from "../../../src/utils/logger";

jest.mock("../../../src/utils/logger", () => ({
  info: jest.fn(),
}));

describe("Request Logger Middleware", () => {
  it("logs request and calls next()", () => {
    const req: any = { method: "GET", url: "/api/portfolio" };
    const res: any = {};
    const next = jest.fn();

    requestLogger(req, res, next);

    expect(logger.info).toHaveBeenCalledWith("GET /api/portfolio");
    expect(next).toHaveBeenCalled();
  });
});
