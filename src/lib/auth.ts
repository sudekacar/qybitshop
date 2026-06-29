import type { SessionOptions } from "iron-session";
import type { SessionData } from "@/types";

export const defaultSession: SessionData = {
  isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
  password:
    process.env.SESSION_SECRET ??
    "complex_password_at_least_32_characters_long_for_dev",
  cookieName: "multiacademy-session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  },
};
