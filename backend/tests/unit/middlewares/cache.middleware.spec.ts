import { cacheMiddleware } from "../../../src/middlewares/cache.middleware";
import cache from "../../../src/middlewares/cache.middleware";

describe("Cache Middleware", () => {
  it("should serve from cache", () => {
    const req: any = {};
    const res: any = { json: jest.fn() };
    const next: any = jest.fn();
    cache.set("key", { foo: "bar" });

    const mw = cacheMiddleware(() => "key");
    mw(req, res, next);
    expect(res.json).toHaveBeenCalledWith({ foo: "bar" });
  });
});
