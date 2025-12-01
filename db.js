// db.js - Native MongoDB connection (NO MONGOOSE)

const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI; 
const client = new MongoClient(uri);

let db = null;

async function connectDB() {
  if (db) return db; 

  await client.connect();
  db = client.db("smartclass"); 
  console.log("✅ Connected to MongoDB (native driver)");
  return db;
}

function getDB() {
  if (!db) {
    throw new Error("Database not initialised. Call connectDB() first.");
  }
  return db;
}

module.exports = { connectDB, getDB };
