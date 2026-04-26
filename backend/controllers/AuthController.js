import Auth from "../models/Authmodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendWelcomeEmail } from "../utils/sendEmail.js";

/* ================= REGISTER USER ================= */
export async function registerUser(req, res) {
  try {
    const { name, email, phone, username, password } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (await Auth.findOne({ email }))
      return res.status(400).json({ message: "Email already registered" });

    if (await Auth.findOne({ username }))
      return res.status(400).json({ message: "Username already taken" });

    if (await Auth.findOne({ phone }))
      return res.status(400).json({ message: "Phone already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await Auth.create({
      name,
      email,
      phone,
      username,
      password: hashedPassword,
      role: "user",
      blocked: false,
    });

    // Try to send welcome email but don't fail registration if it fails
    try {
      await sendWelcomeEmail(email, name);
    } catch (emailError) {
      console.error("Failed to send welcome email:", emailError);
    }

    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        username: newUser.username,
        phone: newUser.phone,
        role: newUser.role
      },
    });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: error.message || "Registration failed" });
  }
}

/* ================= LOGIN USER ================= */
export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await Auth.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "Email not found" });

    if (user.blocked)
      return res.status(403).json({
        message: "Your account is blocked. Contact admin.",
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid password" });

    const auth_token = jwt.sign(
      { id: user._id, role: user.role || "user" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("auth_token", auth_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.sameSite || "lax",
      maxAge: 3600 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        phone: user.phone,
        role: user.role
      },
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: error.message || "Login failed" });
  }
}

/* ================= LOGOUT USER ================= */
export async function logoutUser(req, res) {
  try {
    res.clearCookie("auth_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.sameSite || "lax",
    });

    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: error.message || "Logout failed" });
  }
}

/* ================= GET ALL USERS ================= */
export async function getUsers(req, res) {
  try {
    const users = await Auth.find();
    if (!users.length)
      return res.status(404).json({ message: "No users found" });

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

/* ================= UPDATE USER ================= */
export async function updateUser(req, res) {
  try {
    const { id } = req.params;

    const updatedUser = await Auth.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

/* ================= DELETE USER ================= */
export async function deleteUser(req, res) {
  try {
    const { id } = req.params;

    const deletedUser = await Auth.findByIdAndDelete(id);
    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      message: "User deleted successfully",
      user: deletedUser,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

/* ================= BLOCK / UNBLOCK USER ================= */
export async function UserBlock(req, res) {
  try {
    const { id } = req.params;
    const { blocked } = req.body;

    const user = await Auth.findByIdAndUpdate(
      id,
      { blocked },
      { new: true }
    );

    if (!user)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      message: "User status updated",
      user,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
