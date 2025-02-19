import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import Admin from "../models/admin.model.js";
import crypto from "crypto";
import { sendEmail } from "../lib/sendEmail.js";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    //FIELDS CHECK
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //CHECK PASSWORD LENGTH
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    const user = await Admin.findOne({ email });

    //CHECK IF THE USER ALREAD EXISTS
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    //HASH PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //CREATE USER
    const newAdmin = new Admin({
      name: name,
      email: email,
      password: hashedPassword,
    });

    await newAdmin.save();

    res.status(201).json({
      message:
        "Account created successfully, you will be soon verified by present admin.",
    });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, admin.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const isAdminVerified = await Admin.findOne({ email, isVerified: true });
    if (!isAdminVerified) {
      return res.status(400).json({
        message:
          "Your account is not verified. Please contact present admin for verification.",
      });
    }

    generateToken(admin._id, res);

    res.status(200).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      isVerified: admin.isVerified,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const checkAuth = async (req, res) => {
  try {
    res.status(200).json(req.admin);
  } catch (error) {
    console.log("Error in checkAuth controller: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Request password reset (Forgot Password)
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Set reset token and expiration in DB
    admin.resetPasswordToken = hashedToken;
    admin.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // Token valid for 10 minutes

    await admin.save();

    // Send email with reset link
    const resetUrl = `${process.env.FRONTEND_URL}/admin/reset-password?token=${resetToken}`;
    const message = `Click the link below to reset your password:\n\n${resetUrl}\n\nThis link expires in 10 minutes.`;

    await sendEmail({
      to: admin.email,
      subject: "Password Reset Request",
      text: message,
    });

    res.status(200).json({
      message: "Password reset link has been sent to your email.",
    });
  } catch (error) {
    console.error("Error in forgotPassword:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  const { token } = req.query;
  const { password } = req.body;

  try {
    if (!token) {
      return res.status(400).json({ message: "Reset token is required" });
    }

    // Hash the token to match the stored hash
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // Find the admin by token and check if it's expired
    const admin = await Admin.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!admin) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Check if the new password is the same as the old password
    const isSamePassword = await bcrypt.compare(password, admin.password);
    if (isSamePassword) {
      return res
        .status(400)
        .json({
          message: "New password must be different from the previous password",
        });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(password, salt);

    // Remove the reset token fields
    admin.resetPasswordToken = undefined;
    admin.resetPasswordExpires = undefined;

    await admin.save();

    res
      .status(200)
      .json({ message: "Password reset successful. You can now log in." });
  } catch (error) {
    console.error("Error in resetPassword:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
