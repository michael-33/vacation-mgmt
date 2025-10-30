import { Router } from "express";
import requestRoutes from "./request.routes.js";

const router = Router();

// basic route to check if the server is running
router.get("/health", (_req, res) => {
  res.json({ ok: true });
});

router.use("/requests", requestRoutes);

export default router;
