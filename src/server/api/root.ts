import { createTRPCRouter } from "./trpc";
import { subscriptionRouter } from "./routers/subscriptionRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  subscription: subscriptionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
