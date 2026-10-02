import { createHmac, scryptSync, timingSafeEqual } from "node:crypto";
import type { CookieOptions, Request, Response } from "express";
import { ENV } from "./env";
import { getSessionCookieOptions } from "./cookies";

export const OWNER_COOKIE_NAME = "empowerlife4u_owner";
const OWNER_SESSION_TTL_MS = 8 * 60 * 60 * 1000;
const OWNER_HASH_SALT = "empowerlife4u-owner-v1";
const OWNER_USERNAME_HASH = "be8c28e4382425890e3511593b22756703f209207fab5615ca9e2513114e510aeff62a73421b48de6469afe8991898f0d988a4fbc2000910f553c9fd1f3c9978";
const OWNER_PASSWORD_HASH = "695cd859110f827595ffe1f6a35a497b9b2d5180b75f3adba7916f10213aa18c067818bbbd113fbce48b5f23414635073717747f2601f8eac647e3dbf57a483d";

function digest(value: string) {
  return scryptSync(value, OWNER_HASH_SALT, 64).toString("hex");
}

function matches(value: string, expected: string) {
  const actual = Buffer.from(digest(value), "hex");
  const target = Buffer.from(expected, "hex");
  return actual.length === target.length && timingSafeEqual(actual, target);
}

function sign(payload: string) {
  return createHmac("sha256", ENV.cookieSecret || "empowerlife4u-owner-session").update(payload).digest("hex");
}

function cookieOptions(req: Request): CookieOptions {
  return { ...getSessionCookieOptions(req), maxAge: OWNER_SESSION_TTL_MS };
}

export function verifyOwnerCredentials(username: string, password: string) {
  return matches(username, OWNER_USERNAME_HASH) && matches(password, OWNER_PASSWORD_HASH);
}

export function createOwnerSession(res: Response, req: Request) {
  const expiresAt = Date.now() + OWNER_SESSION_TTL_MS;
  const payload = String(expiresAt);
  res.cookie(OWNER_COOKIE_NAME, `${payload}.${sign(payload)}`, {
    ...cookieOptions(req),
    maxAge: OWNER_SESSION_TTL_MS,
  });
}

export function clearOwnerSession(res: Response, req: Request) {
  res.clearCookie(OWNER_COOKIE_NAME, cookieOptions(req));
}

export function isOwnerSessionValid(req: Request) {
  const header = req.headers.cookie || "";
  const value = header.split(";").map(part => part.trim()).find(part => part.startsWith(`${OWNER_COOKIE_NAME}=`))?.slice(OWNER_COOKIE_NAME.length + 1);
  if (!value) return false;

  const [payload, signature] = value.split(".");
  if (!payload || !signature || !/^\d+$/.test(payload) || Number(payload) < Date.now()) return false;

  const expected = sign(payload);
  const actual = Buffer.from(signature, "hex");
  const target = Buffer.from(expected, "hex");
  return actual.length === target.length && timingSafeEqual(actual, target);
}
