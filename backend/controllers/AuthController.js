import mongoose from "mongoose";
import Auth from "../models/Authmodel.js";
import bcrypt from "bcrypt";
import "dotenv/config.js";
import jwt from "jsonwebtoken";

export async function registerUser(req, res) {
  try {
    const data = req.body;

    const userExists = await Auth.findOne({ username: data.username });
    if (userExists) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const emailExits = await Auth.findOne({ email: data.email });
    if (emailExits) {
      return res.status(400).json({ message: "email already exists" });
    }

    const phoneExits = await Auth.findOne({ phone: data.phone });
    if (phoneExits) {
      return res.status(400).json({ message: "phone already exists" });
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
    data.role = "user";

    const newUser = new Auth(data);
    await newUser.save();
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
}
export async function getUsers(req, res) {
  try {
    const users = await Auth.find();
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    } else {
      return res.status(200).json({ users: users });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
}
export async function loginUser(req, res) {
  try {
    const data = req.body;
    const user = await Auth.findOne({ email: data.email });
    if (!user) {
      return res.status(404).json({ message: "email not found" });
    }
    const doesPasswordMatch = await bcrypt.compare(
      data.password,
      user.password

    );
    if (user.role !== "user")
      return res.status(404).json({ message: "you are not a user" });
    
    if (!doesPasswordMatch) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }

    const auth_token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
   res.cookie("auth_token", auth_token, {
     httpOnly: true,
     secure: true, 
     sameSite: "None", 
     maxAge: 3600 * 1000, 
   });


    return res.status(200).json({ message: "Login Successful", user: user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
}
export async function logoutUser(req, res) {
  try {
    res.cookie("auth_token", "", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: -1,
    });
    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
export async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const updatedRecord = req.body;
    if (!id) {
      return res.status(400).json({ message: "ID parameter is required" });
    }
    if (!updatedRecord) {
      return res
        .status(400)
        .json({ message: "Updated user schema is required" });
    }

    const updatedUser = await Auth.findByIdAndUpdate(id, updatedRecord, {
      new: true,
    });
    if (!updatedUser)
      return res.status(404).json({ message: "Could not update this user" });
    return res.status(200).json({ message: "User Updated", user: updatedUser });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
export async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({ message: "ID parameter is required" });

    const userDeleted = await Auth.findByIdAndDelete(id);
    if (!userDeleted) {
      return res.status(404).json({ message: "User not found" });
    }
    return res
      .status(200)
      .json({ message: "User deleted successfully", user: userDeleted });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
}