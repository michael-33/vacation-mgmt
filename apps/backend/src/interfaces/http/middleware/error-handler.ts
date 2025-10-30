import { Request, Response, NextFunction } from "express";

// handle all uncaught errors in http requests
export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error("error:", err);

  // Zod & known validation errors
  const anyErr = err as any;
  if (anyErr?.name === "ZodError") {
    return res
      .status(400)
      .json({ error: "validation_error", details: anyErr.issues });
  }

  if (err instanceof Error) return res.status(500).json({ error: err.message });

  return res.status(500).json({ error: "unknown error" });
}
