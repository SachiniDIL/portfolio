import "server-only";
import { MongoClient, type Db } from "mongodb";

const dbName = process.env.MONGODB_DB || "portfolio";

let clientPromise: Promise<MongoClient> | undefined;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function createClientPromise(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error(
      "MONGODB_URI is not set. Add it to .env.local (see .env.example) to enable the blog."
    );
  }
  return new MongoClient(uri).connect();
}

function getClientPromise(): Promise<MongoClient> {
  // Cache the connection on the global object in dev so Next's hot-reload
  // doesn't open a fresh MongoClient on every module reload.
  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = createClientPromise();
    }
    return global._mongoClientPromise;
  }
  if (!clientPromise) {
    clientPromise = createClientPromise();
  }
  return clientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await getClientPromise();
  return client.db(dbName);
}
