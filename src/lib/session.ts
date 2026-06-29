import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions } from "./auth";
import type { SessionData } from "@/types";

export async function getSession(): Promise<SessionData> {
  const cookieStore = await cookies();
  return getIronSession<SessionData>(cookieStore, sessionOptions);
}

export async function requireAuth(): Promise<SessionData> {
  const session = await getSession();
  if (!session.isLoggedIn || !session.userId) {
    throw new Error("Unauthorized");
  }
  return session;
}
