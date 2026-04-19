import app from "../dist/app.js";
import config from "../dist/config/index.js";
import { connectDB } from "../dist/config/db.js";

export default async function handler(request, response) {
  if (request.url !== "/health") {
    try {
      await connectDB(config.databaseUrl);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.warn(`MongoDB unavailable, using local data fallback: ${message}`);
    }
  }

  return app(request, response);
}
