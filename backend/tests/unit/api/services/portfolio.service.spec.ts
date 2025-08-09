import * as service from "../../../../src/api/services/portfolio.service";
import * as fileUtils from "../../../../src/utils/file";
import { samplePortfolio } from "../../../fixtures/portfolio.fixture";

jest.mock("../../../../src/utils/file");

describe("Portfolio Service", () => {
  beforeEach(() => {
    (fileUtils.readJsonFile as jest.Mock).mockResolvedValue(samplePortfolio);
  });

  it("returns portfolio list", async () => {
    const result = await service.getPortfolio();
    expect(result.length).toBe(1);
    expect(result[0].symbol).toBe("DEMO");
  });

  it("returns portfolio summary", async () => {
    const summary = await service.getPortfolioSummary();
    expect(summary.totalInvestment).toBeGreaterThan(0);
  });
});
