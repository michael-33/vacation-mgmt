import { Request, Response } from "express";
import { createVacationRequest } from "../../../application/usecases/create-request.usecase.js";
import { listMyRequests } from "../../../application/usecases/list-my-requests.usecase.js";
import { listAllRequests } from "../../../application/usecases/list-all-requests.usecase.js";
import { approveRequest } from "../../../application/usecases/approve-request.usecase.js";
import { rejectRequest } from "../../../application/usecases/reject-request.usecase.js";

// http handlers for vacation requests
export const requestController = {
  // post /requests
  async create(req: Request, res: Response) {
    const user = (req as any).user;
    await createVacationRequest(user.id, req.body);
    res.status(201).json({ ok: true });
  },

  // get /requests/me
  async listMine(req: Request, res: Response) {
    const user = (req as any).user;
    const items = await listMyRequests(user.id);
    res.json({ items });
  },

  // get /requests
  async listAll(_req: Request, res: Response) {
    const items = await listAllRequests();
    res.json({ items });
  },

  // post /requests/:id/approve
  async approve(req: Request, res: Response) {
    const id = Number(req.params.id);
    await approveRequest(id);
    res.json({ ok: true });
  },

  // post /requests/:id/reject
  async reject(req: Request, res: Response) {
    const id = Number(req.params.id);
    const comment: string | undefined = req.body?.comment;
    await rejectRequest(id, comment);
    res.json({ ok: true });
  },
};
