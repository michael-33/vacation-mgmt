import { requestRepo } from "../../infrastructure/repositories/request.repo.js";
import { validateVacationRequest } from "../../domain/services/validation.service.js";
import { RequestStatus } from "common";

// handle the creation of a new vacation request
export async function createVacationRequest(userId: number, data: unknown) {
  const validated = validateVacationRequest(data);

  // check overlap against non-rejected requests for the same user
  const overlaps = await requestRepo.findOverlaps(
    userId,
    validated.startDate,
    validated.endDate
  );
  if (overlaps.length > 0) {
    const err: any = new Error(
      "request dates overlap with an existing request"
    );
    err.status = 409;
    err.details = overlaps.map((r) => ({
      id: r.id,
      start: r.start_date,
      end: r.end_date,
      status: r.status,
    }));
    throw err;
  }

  await requestRepo.create({
    user_id: userId,
    start_date: validated.startDate,
    end_date: validated.endDate,
    reason: validated.reason ?? null,
    status: RequestStatus.PENDING,
    comments: null,
  });
}
