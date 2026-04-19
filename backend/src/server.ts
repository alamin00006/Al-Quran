import app from "./app.js";
import config from "./config/index.js";
import { connectDB } from "./config/db.js";

async function main() {
  try {
    await connectDB(config.databaseUrl);
    app.listen(config.port, () => {
      console.log(`Quran API running on http://localhost:${config.port}`);
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Failed to start server:", message);
    process.exit(1);
  }
}

void main();

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
});
