import { Request, Response, NextFunction } from "express";

// handle all uncaught errors in http requests
export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  console.error("error:", err);

  if (err instanceof Error) {
    return res.status(500).json({ error: err.message });
  }

  return res.status(500).json({ error: "unknown error" });
}
