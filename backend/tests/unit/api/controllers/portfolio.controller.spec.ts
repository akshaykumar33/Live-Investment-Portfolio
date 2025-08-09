import * as controller from "../../../../src/api/controllers/portfolio.controller";
import * as service from "../../../../src/api/services/portfolio.service";
import { samplePortfolio } from "../../../fixtures/portfolio.fixture";

jest.mock("../../../../src/api/services/portfolio.service");

describe("Portfolio Controller", () => {
  let req: any, res: any, next: any;

  beforeEach(() => {
    req = { query: {}, params: {} };
    res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    next = jest.fn();
  });

  it("getAll should return portfolio", async () => {
    (service.refreshPortfolioPrices as jest.Mock).mockResolvedValue(samplePortfolio);
    await controller.getAll(req, res, next);
    expect(res.json).toHaveBeenCalledWith(samplePortfolio);
  });

});
