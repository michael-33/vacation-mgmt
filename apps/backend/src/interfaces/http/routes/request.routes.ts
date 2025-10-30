import { Router } from "express";
import { requestController } from "../controllers/request.controller.js";
import { userContext } from "../middleware/user-context.js";
import { requireValidator } from "../middleware/role-guard.js";

const router = Router();

// apply user context middleware to all routes
router.use(userContext);

// requester endpoints
router.post("/", requestController.create);
router.get("/me", requestController.listMine);

// validator endpoints
router.get("/", requireValidator, requestController.listAll);
router.post("/:id/approve", requireValidator, requestController.approve);
router.post("/:id/reject", requireValidator, requestController.reject);

export default router;
