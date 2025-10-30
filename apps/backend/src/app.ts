import express from "express";
import cors from "cors";
import routes from "./interfaces/http/routes/index.js";
import { errorHandler } from "./interfaces/http/middleware/error-handler.js";
import { ENV } from "./config/env.js";

// main express app configuration
export const createApp = () => {
  const app = express();

  const altOrigin = ENV.FRONTEND_ORIGIN.replace("localhost", "127.0.0.1");
  app.use(
    cors({
      origin: [ENV.FRONTEND_ORIGIN, altOrigin],
      credentials: true,
    })
  );
  app.use(express.json());

  app.use(ENV.API_PREFIX, routes);

  // global error handler
  app.use(errorHandler);

  return app;
};
