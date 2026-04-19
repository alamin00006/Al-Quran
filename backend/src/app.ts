import compression from "compression";
import cors from "cors";
import express, {
  type Request,
  type RequestHandler,
  type Response,
} from "express";
import helmet from "helmet";

import appRoutes from "./app/routes/index.js";
import config from "./config/index.js";
import globalErrorHandler from "./errors/globalErrorHandler.js";
import notFound from "./errors/notFound.js";

const app = express();
const helmetMiddleware = helmet as unknown as () => RequestHandler;

app.use(helmetMiddleware());
app.use(cors({ origin: config.corsOrigin }));
app.use(express.json({ limit: "1mb" }));
app.use(compression());

app.get("/health", (_request: Request, response: Response) => {
  response.json({ status: "ok", uptime: process.uptime() });
});

app.use("/api/v1", appRoutes);

app.use(notFound);
app.use(globalErrorHandler);

export default app;
