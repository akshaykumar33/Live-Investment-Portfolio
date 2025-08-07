import NodeCache from "node-cache";
import { Request, Response, NextFunction } from "express";

const cache = new NodeCache({ stdTTL: Number(`${process.env.TTL}`),checkperiod: 600 }); 

export const cacheMiddleware = (keyGenerator: (req: Request) => string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const key = keyGenerator(req);
    const cachedData = cache.get(key);
    if (cachedData) {
      return res.json(cachedData);
    } else {
      // Override res.json to cache the response before sending
      const originalJson = res.json.bind(res);
      res.json = (body) => {
        cache.set(key, body);
        return originalJson(body);
      };
      next();
    }
  };
};


export default cache;
