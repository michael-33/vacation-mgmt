import { Request, Response, NextFunction } from "express";
import { userRepo } from "../../../infrastructure/repositories/user.repo.js";

// attach user object to the request using x-user-id header
// basic validations - not for production
export async function userContext(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const header = req.header("x-user-id");
  if (!header) {
    return res.status(401).json({ error: "missing x-user-id header" });
  }

  const userId = Number(header);
  const user = await userRepo.findById(userId);

  if (!user) {
    return res.status(404).json({ error: "user not found" });
  }

  (req as any).user = user;
  next();
}
