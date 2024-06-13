import { MongoClient, Db } from "mongodb";

const connStr = process.env.MONGODB_URI || 'mongodb+srv://iamateapot:iamnotateapot1234@cluster0.uuzhuwz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const cli = new MongoClient(connStr);
await cli.connect();

export let db: Db = cli.db('prometeo');