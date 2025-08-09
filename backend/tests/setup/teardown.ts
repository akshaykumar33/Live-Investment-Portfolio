import cache from "../../src/middlewares/cache.middleware";

// Flush all in-memory caches after all tests
afterAll(() => {
  cache.flushAll();
  // Any additional teardown logic
});
