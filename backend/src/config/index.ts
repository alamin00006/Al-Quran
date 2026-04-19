import dotenv from "dotenv";
import path from "node:path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

function getEnv(name: string) {
  return process.env[name]?.trim();
}

const config = {
  nodeEnv: getEnv("NODE_ENV") || "development",
  port: Number(process.env.PORT) || 5000,
  databaseUrl: getEnv("MONGODB_URI"),
  corsOrigin: getEnv("CORS_ORIGIN") || "*",
};

export default config;
