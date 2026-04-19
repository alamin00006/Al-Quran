import mongoose from "mongoose";

let connectionPromise: Promise<typeof mongoose> | null = null;

export async function connectDB(uri?: string) {
  if (!uri) {
    throw new Error("MONGODB_URI is required");
  }

  if (mongoose.connection.readyState === 1) {
    return;
  }

  if (connectionPromise) {
    await connectionPromise;
    return;
  }

  mongoose.set("strictQuery", true);
  connectionPromise = mongoose.connect(uri).catch((error: unknown) => {
    connectionPromise = null;
    throw error;
  });
  await connectionPromise;
  console.log("MongoDB connected");
}

export function isDBConnected() {
  return mongoose.connection.readyState === 1;
}
