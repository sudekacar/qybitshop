"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions } from "@/lib/auth";
import {
  createUser,
  getUserByEmail,
  verifyPassword,
} from "@/lib/users";
import { getRedirectPath } from "@/lib/validators";
import type { SessionData } from "@/types";

const registerSchema = z.object({
  name: z.string().min(2, "Ad en az 2 karakter olmalıdır"),
  email: z.string().email("Geçerli bir e-posta giriniz"),
  password: z.string().min(6, "Şifre en az 6 karakter olmalıdır"),
});

const loginSchema = z.object({
  email: z.string().email("Geçerli bir e-posta giriniz"),
  password: z.string().min(1, "Şifre gereklidir"),
});

export type AuthState = {
  error?: string;
  success?: boolean;
};

export async function registerAction(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Geçersiz form" };
  }

  const { name, email, password } = parsed.data;

  try {
    const existing = getUserByEmail(email);
    if (existing) {
      return { error: "Bu e-posta adresi zaten kayıtlı" };
    }

    const user = createUser(name, email, password);
    const cookieStore = await cookies();
    const session = await getIronSession<SessionData>(
      cookieStore,
      sessionOptions
    );

    session.userId = user.id;
    session.email = user.email;
    session.name = user.name;
    session.isLoggedIn = true;
    await session.save();
  } catch {
    return { error: "Kayıt sırasında bir hata oluştu" };
  }

  redirect("/");
}

export async function loginAction(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Geçersiz form" };
  }

  const { email, password } = parsed.data;

  try {
    const user = getUserByEmail(email);
    if (!user || !verifyPassword(password, user.password_hash)) {
      return { error: "E-posta veya şifre hatalı" };
    }

    const cookieStore = await cookies();
    const session = await getIronSession<SessionData>(
      cookieStore,
      sessionOptions
    );

    session.userId = user.id;
    session.email = user.email;
    session.name = user.name;
    session.isLoggedIn = true;
    await session.save();
  } catch {
    return { error: "Giriş sırasında bir hata oluştu" };
  }

  const redirectTo = getRedirectPath(formData.get("redirect"));
  redirect(redirectTo);
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(
    cookieStore,
    sessionOptions
  );
  session.destroy();
  redirect("/login");
}
