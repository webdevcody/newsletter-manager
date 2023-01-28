import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { subscribeUseCase } from "../useCases/subscribeUseCase";
import { unsubscribeUseCase } from "../useCases/unsubscribeUseCase";

export const subscriptionRouter = createTRPCRouter({
  subscribe: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(({ input }) => subscribeUseCase(input.email)),

  unsubscribe: publicProcedure
    .input(z.object({ unsubscribeId: z.string() }))
    .mutation(({ input }) => unsubscribeUseCase(input.unsubscribeId)),
});
