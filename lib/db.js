import { neon } from "@neondatabase/serverless";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not configured");
}

// جلوگیری از ساخت اتصالات تکراری در محیط سرورلس ورسل
if (!global.neonSql) {
  global.neonSql = neon(databaseUrl);
}

export const sql = global.neonSql;
