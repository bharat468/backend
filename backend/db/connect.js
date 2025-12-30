// import mongodb from 'mongodb'
import mongoose from "mongoose" //object Data Models Library hai @bharat
import "dotenv/config" // ye aapni env fill ko read krti hai or process.env
//ko active krti hai

async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL)
    }
    catch (error) {
        console.log("error connecting to database:", error)
    }
}

export default connectToDB
