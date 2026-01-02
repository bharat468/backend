import { Schema, model } from "mongoose";

const authSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, unique: true },
    username: { type: String, unique: true, min: 4, max: 30 },
    password: { type: String, min: 4, max: 30 },
    image: { type: String },
    authProvider: { type: String, enum: ["local", "google"], default: "local", },
    googleId: { type: String, unique: true, sparse: true },
    role: { type: String }
})

const Auth = model("auth", authSchema, "auth")
export default Auth