export const ENV = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  SQLITE_FILE: process.env.SQLITE_FILE ?? "./data/app.sqlite",
  PORT: Number(process.env.PORT ?? 3001),
  API_PREFIX: process.env.API_PREFIX ?? "/api/v1",
  FRONTEND_ORIGIN: process.env.FRONTEND_ORIGIN ?? "http://localhost:5173",
};
