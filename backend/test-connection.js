import mongoose from "mongoose";
import "dotenv/config";

console.log("🔍 Testing MongoDB Connection...");
console.log("📝 MONGO_URL exists:", !!process.env.MONGO_URL);

// Mask the password in URL for safe logging
const maskedUrl = process.env.MONGO_URL 
  ? process.env.MONGO_URL.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@')
  : 'NOT SET';
console.log("🔗 Connection URL (masked):", maskedUrl);

async function testConnection() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4,
    });
    
    console.log("✅ Connection successful!");
    console.log("📊 Database name:", mongoose.connection.name);
    console.log("🏠 Host:", mongoose.connection.host);
    
    // Test a simple query
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("📁 Collections found:", collections.length);
    collections.forEach(col => console.log("  -", col.name));
    
    await mongoose.connection.close();
    console.log("👋 Connection closed");
    process.exit(0);
  } catch (error) {
    console.error("❌ Connection failed!");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    
    if (error.message.includes("bad auth")) {
      console.error("\n💡 Fix: Check username/password in MongoDB Atlas");
      console.error("   1. Go to Database Access");
      console.error("   2. Verify user exists and password is correct");
      console.error("   3. User should have 'Read and write' permissions");
    }
    
    process.exit(1);
  }
}

testConnection();
