import Auth from '../models/Authmodel.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import "dotenv/config";

export async function loginAdmin(req, res) {
    try {
        const data = req.body;

        console.log(data);

        const user = await Auth.findOne({ email: data.email });
        if (!user) return res.status(404).json({ message: "Email not found" });

        if (user.role !== "admin")
            return res.status(401).json({ message: "You are not an Admin" });

        const doesPasswordMatch = await bcrypt.compare(data.password, user.password);
        if (!doesPasswordMatch) return res.status(404).json({ message: "Invalid Credentials" });

        const admin_token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.cookie("admin_token", admin_token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 3600000
        });

        return res.status(200).json({ message: "Login successful" });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export async function logoutAdmin(req, res) {
    try {
        res.clearCookie("admin_token", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: -1
        });

        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export async function updateAdmin(req, res) {
    return res.status(200).json({ message: "Update Admin API ready" });
}
