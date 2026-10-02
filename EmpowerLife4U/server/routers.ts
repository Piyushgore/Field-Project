import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { ownerProcedure, publicProcedure, router } from "./_core/trpc";
import { createInquiry, listInquiries, updateInquiryStatus } from "./db";
import { z } from "zod";
import { clearOwnerSession, createOwnerSession, verifyOwnerCredentials } from "./_core/ownerAuth";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  owner: router({
    status: publicProcedure.query(({ ctx }) => ({ authenticated: ctx.ownerAuthenticated })),
    login: publicProcedure
      .input(z.object({ username: z.string().trim().min(1).max(120), password: z.string().min(1).max(200) }))
      .mutation(({ ctx, input }) => {
        if (!verifyOwnerCredentials(input.username, input.password)) {
          return { success: false } as const;
        }
        createOwnerSession(ctx.res, ctx.req);
        return { success: true } as const;
      }),
    logout: publicProcedure.mutation(({ ctx }) => {
      clearOwnerSession(ctx.res, ctx.req);
      return { success: true } as const;
    }),
  }),

  inquiries: router({
    list: ownerProcedure.query(() => listInquiries()),
    updateStatus: ownerProcedure
      .input(z.object({ id: z.number().int().positive(), status: z.enum(["new", "contacted", "closed"]) }))
      .mutation(({ input }) => updateInquiryStatus(input.id, input.status)),
    create: publicProcedure
      .input(z.object({
        name: z.string().trim().min(2).max(120),
        email: z.string().trim().email().max(320),
        message: z.string().trim().min(10).max(5000),
      }))
      .mutation(async ({ input }) => {
        const inquiry = await createInquiry(input);
        return { success: true, inquiryId: inquiry.id } as const;
      }),
  }),

  // TODO: add feature routers here, e.g.
  // todo: router({
  //   list: protectedProcedure.query(({ ctx }) =>
  //     db.getUserTodos(ctx.user.id)
  //   ),
  // }),
});

export type AppRouter = typeof appRouter;
