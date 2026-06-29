import bcrypt from "bcryptjs";
import { getDb } from "./db";
import { queryOne } from "./db-query";
import type { User, UserWithPassword } from "@/types";

export function getUserByEmail(email: string): UserWithPassword | null {
  const db = getDb();
  return queryOne<UserWithPassword>(
    db,
    "SELECT * FROM users WHERE email = ?",
    email
  );
}

export function getUserById(id: number): User | null {
  const db = getDb();
  return queryOne<User>(
    db,
    "SELECT id, name, email, role, created_at, updated_at FROM users WHERE id = ?",
    id
  );
}

export function createUser(
  name: string,
  email: string,
  password: string
): User {
  const db = getDb();
  const passwordHash = bcrypt.hashSync(password, 10);

  const result = db
    .prepare(
      "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)"
    )
    .run(name, email, passwordHash);

  const user = getUserById(Number(result.lastInsertRowid));
  if (!user) {
    throw new Error("Kullanıcı oluşturulamadı");
  }
  return user;
}

export function verifyPassword(
  plainPassword: string,
  passwordHash: string
): boolean {
  return bcrypt.compareSync(plainPassword, passwordHash);
}
