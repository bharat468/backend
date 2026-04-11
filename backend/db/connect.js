// import mongodb from 'mongodb'
import mongoose from "mongoose" //object Data Models Library hai @bharat
import "dotenv/config" // ye aapni env fill ko read krti hai or process.env
//ko active krti hai

async function connectToDB() {
    try {
        console.log("🔄 Attempting to connect to MongoDB...");
        
        if (!process.env.MONGO_URL) {
            throw new Error("MONGO_URL is not defined in environment variables");
        }

        await mongoose.connect(process.env.MONGO_URL, {
            serverSelectionTimeoutMS: 30000, // 30 seconds for Render's slower network
            socketTimeoutMS: 45000,
            family: 4, // Use IPv4, skip trying IPv6
        });
        
        console.log("✅ Database connected successfully");
        console.log("📊 Connected to:", mongoose.connection.name);
    }
    catch (error) {
        console.log("❌ Error connecting to database:", error.message);
        console.log("🔍 Connection string (masked):", process.env.MONGO_URL ? "EXISTS" : "MISSING");
        throw error;
    }
}

export default connectToDB
