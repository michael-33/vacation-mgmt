import express from "express";
import cors from "cors";
import routes from "./interfaces/http/routes/index.js";
import { errorHandler } from "./interfaces/http/middleware/error-handler.js";
import { ENV } from "./config/env.js";

// main express app configuration
export const createApp = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use(ENV.API_PREFIX, routes);

  // global error handler
  app.use(errorHandler);

  return app;
};
