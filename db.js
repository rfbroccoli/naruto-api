import { MongoClient } from "mongodb"

const { MONGODB_URL } = process.env
const client = new MongoClient(MONGODB_URL)
export const clientPromise = client.connect()