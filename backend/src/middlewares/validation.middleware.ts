import { z } from "zod";
import { Request, Response, NextFunction } from "express";

export const validateBody = (schema: z.ZodTypeAny) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.errors });
    }
  };
};
