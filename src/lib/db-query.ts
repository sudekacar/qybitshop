import type Database from "better-sqlite3";

type SqlBindValue = string | number | null | bigint | Buffer;

/**
 * SQLite sorgu sonuçları için merkezi tip sınırı.
 * better-sqlite3 çalışma zamanında şema doğrulaması yapmaz;
 * bu yüzden dönüş tipleri burada tek noktada belirlenir.
 */
export function queryOne<T>(
  db: Database.Database,
  sql: string,
  ...params: SqlBindValue[]
): T | null {
  const row = db.prepare(sql).get(...params);
  if (row === undefined) {
    return null;
  }
  return row as T;
}

export function queryAll<T>(
  db: Database.Database,
  sql: string,
  ...params: SqlBindValue[]
): T[] {
  return db.prepare(sql).all(...params) as T[];
}

export function queryCount(
  db: Database.Database,
  sql: string,
  ...params: SqlBindValue[]
): number {
  const row = queryOne<{ count: number }>(db, sql, ...params);
  return row?.count ?? 0;
}
