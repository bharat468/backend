import Auth from "../models/Authmodel.js";
import OTP from "../models/OtpModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sgMail from "@sendgrid/mail";
import { sendWelcomeEmail } from "../utils/sendEmail.js";

sgMail.setApiKey(process.env.MY_SENDGRID_API_KEY);

export async function sendOtp(req, res) {
  try {
    const { email, username, phone } = req.body;

    if (await Auth.findOne({ email }))
      return res.status(400).json({ message: "Email already registered" });

    if (await Auth.findOne({ username }))
      return res.status(400).json({ message: "Username already taken" });

    if (await Auth.findOne({ phone }))
      return res.status(400).json({ message: "Phone already registered" });

    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log(otp)
    const otpHash = await bcrypt.hash(otp.toString(), 10);
    // console.log(otpHash)

    // 🔹 Save OTP in DB (replace old one)
    await OTP.findOneAndUpdate(
      { email },
      { email, otpHash, expiresAt: Date.now() + 5 * 60 * 1000 },
      { upsert: true }
    );

    await sgMail.send({
      to: email,
      from: process.env.MY_SENDGRID_EMAIL,
      subject: "Verify your email",
      html: `<h2>Your OTP is: <b>${otp}</b></h2><p>Valid for 5 minutes.</p>`
    });

    res.json({ message: "OTP sent successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


export async function verifyOtp(req, res) {
  try {
    const { email, otp } = req.body;

    const record = await OTP.findOne({ email });
    if (!record)
      return res.status(400).json({ message: "Send OTP first" });

    if (Date.now() > record.expiresAt)
      return res.status(400).json({ message: "OTP expired" });

    const match = await bcrypt.compare(otp.toString(), record.otpHash);
    if (!match)
      return res.status(400).json({ message: "Incorrect OTP" });

    // 🔥 Delete OTP after success
    await OTP.deleteOne({ email });

    res.json({ verified: true, message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to verify OTP" });
  }
}


export async function registerUser(req, res) {
  try {
    const { name, email, phone, username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await Auth.create({
      name,
      email,
      phone,
      username,
      password: hashedPassword,
      role: "user"
    });

    await sendWelcomeEmail(email, name);

    res.status(201).json({
      message: "User registered successfully",
      user: newUser
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await Auth.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "Email not found" });

    if (user.blocked)
      return res.status(403).json({
        message: "Your account is blocked. Contact admin."
      });

    const doesPasswordMatch = await bcrypt.compare(password, user.password);
    if (!doesPasswordMatch)
      return res.status(400).json({ message: "Invalid password" });

    const auth_token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("auth_token", auth_token, {
      httpOnly: true,
      secure: true,
      sameSite: process.env.sameSite || "lax",
      maxAge: 3600 * 1000
    });

    res.status(200).json({ message: "Login Successful", user });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


export async function logoutUser(req, res) {
  try {
    res.clearCookie("auth_token", {
      httpOnly: true,
      secure: true,
      sameSite: process.env.sameSite || "lax",
    });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

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

export async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const updatedRecord = req.body;

    const updatedUser = await Auth.findByIdAndUpdate(id, updatedRecord, {
      new: true,
    });

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User Updated", user: updatedUser });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


export async function deleteUser(req, res) {
  try {
    const { id } = req.params;

    const userDeleted = await Auth.findByIdAndDelete(id);
    if (!userDeleted)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      message: "User deleted successfully",
      user: userDeleted
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function UserBlock(req, res) {
  try {
    const { id } = req.params;
    const { blocked } = req.body;

    const user = await Auth.findByIdAndUpdate(id, { blocked }, { new: true });

    res.status(200).json({ message: "Status updated", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
