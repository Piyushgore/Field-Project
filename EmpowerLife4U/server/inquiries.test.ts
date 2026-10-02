import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import { verifyOwnerCredentials } from "./_core/ownerAuth";

function createContext(user: TrpcContext["user"] = null): TrpcContext {
  return {
    user,
    ownerAuthenticated: false,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("inquiries", () => {
  it("rejects incomplete inquiry details before database access", async () => {
    const caller = appRouter.createCaller(createContext());
    await expect(caller.inquiries.create({
      name: "A",
      email: "not-an-email",
      message: "short",
    })).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });

  it("rejects a request without the private owner session", async () => {
    const caller = appRouter.createCaller(createContext({
      id: 2,
      openId: "member",
      name: "Member",
      email: "member@example.com",
      loginMethod: "test",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    }));
    await expect(caller.inquiries.list()).rejects.toMatchObject({ code: "UNAUTHORIZED" });
  });

  it("validates the owner credentials on the server", () => {
    expect(verifyOwnerCredentials("Shahir's website", "Shahir01")).toBe(true);
    expect(verifyOwnerCredentials("Shahir's website", "wrong-password")).toBe(false);
  });
});
