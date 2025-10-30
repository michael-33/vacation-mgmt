import { Request, Response, NextFunction } from "express";
import { Role } from "common";

// allow access only if user has validator role
export function requireValidator(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const user = (req as any).user;
  if (!user) {
    return res.status(401).json({ error: "user not found in request" });
  }

  if (user.role !== Role.VALIDATOR) {
    return res.status(403).json({ error: "access denied: validator only" });
  }

  next();
}
