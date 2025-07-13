import mongoose from "mongoose";

const uri = process.env.MONGO_URI as string;

if (!uri) {
  throw new Error("Missing MONGO_URI environment variable");
}

export async function connectMongoose(): Promise<void> {
  await mongoose.connect(uri, {
    dbName: "tasklin",
  });

  console.log("[Mongoose] Connected successfully.");
}
