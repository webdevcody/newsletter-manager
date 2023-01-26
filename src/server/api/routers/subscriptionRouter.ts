import { z } from "zod";
import { createTRPCRouter, localOnlyProcedure, publicProcedure } from "../trpc";
import { subscribeUseCase } from "../useCases/subscribeUseCase";
import { unsubscribeUseCase } from "../useCases/unsubscribeUseCase";
import { composeUseCase } from "../useCases/composeUseCase";

export const subscriptionRouter = createTRPCRouter({
  subscribe: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(({ input }) => subscribeUseCase(input.email)),

  unsubscribe: publicProcedure
    .input(z.object({ unsubscribeId: z.string() }))
    .mutation(({ input }) => unsubscribeUseCase(input.unsubscribeId)),

  compose: localOnlyProcedure
    .input(z.object({ subject: z.string(), body: z.string() }))
    .mutation(({ input }) => composeUseCase(input.subject, input.body)),
});
