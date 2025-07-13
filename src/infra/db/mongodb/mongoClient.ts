import { MongoClient, ServerApiVersion, Db } from "mongodb";

const uri = process.env.MONGO_URI as string;

if (!uri) {
  throw new Error("Missing MONGO_URI environment variable");
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db: Db | null = null;

export async function connectMongo(): Promise<Db> {
  if (!db) {
    await client.connect();
    db = client.db("tasklin");
    console.log("[MongoDB] Connected successfully.");
  }

  return db;
}
