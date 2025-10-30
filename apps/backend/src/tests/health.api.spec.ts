// simple api test to verify the server wiring works
import request from 'supertest';
import { describe, it, expect } from 'vitest';
import { createApp } from '../app.js';
import { ENV } from '../config/env.js';

describe('health endpoint', () => {
  it('returns ok: true', async () => {
    const app = createApp();
    const res = await request(app).get(ENV.API_PREFIX + '/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });
  });
});
