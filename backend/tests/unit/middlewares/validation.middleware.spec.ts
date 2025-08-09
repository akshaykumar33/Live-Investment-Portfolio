import { validateBody } from "../../../src/middlewares/validation.middleware";
import { z } from "zod";

describe("Validation Middleware", () => {
  it("calls next on valid body", () => {
    const mw = validateBody(z.object({ foo: z.string() }));
    const req: any = { body: { foo: "bar" } };
    const next = jest.fn();
    mw(req, {} as any, next);
    expect(next).toHaveBeenCalled();
  });
});
