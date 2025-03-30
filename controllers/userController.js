const bcrypt = require('bcrypt');
const userModel = require("../model/userModel.js");
const { generateToken } = require("../utils/token.js");

// User Signup
const userSignup = async (req, res, next) => {
    try {
        // Collect user data
        const { name, email, password, mobile, address, confirmPassword, profilePic } = req.body;

        // Data validation
        if (!name || !email || !password || !mobile || !address || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user already exists
        const userExist = await userModel.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "This user already exists" });
        }

        // Compare password and confirm password
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        // Hash password
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Save user to DB
        const newUser = new userModel({ name, email, password: hashedPassword, mobile, address, profilePic });
        await newUser.save();

        // Generate token
        const token = generateToken(newUser._id, "user");

        // Set token as a cookie
        res.cookie("token", token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === "production",
            sameSite: "None",
            expires: new Date(Date.now() + 60 * 60 * 1000) // 1-hour expiry
        });

        res.json({ data: newUser, message: "Signup successful" });
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal server error" });
        console.log(error);
    }
};

// User Login
const userLogin = async (req, res, next) => {
    try {
        // Collect user data
        const { email, password } = req.body;

        // Data validation
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user exists
        const userExist = await userModel.findOne({ email });
        if (!userExist) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check password match
        const passwordMatch = bcrypt.compareSync(password, userExist.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        if (!userExist.isActive) {
            return res.status(403).json({ message: "User account is not active" });
        }

        // Generate token
        const token = generateToken(userExist._id, "user");

        // Set token as a cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "None",
            expires: new Date(Date.now() + 60 * 60 * 1000),
        });

        // Send user data without password
        const userData = await userModel.findById(userExist._id).select("-password");

        res.json({ data: userData, message: "Login successful" });
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal server error" });
        console.log(error);
    }
};

// User Profile
const userProfile = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const userData = await userModel.findById(userId).select("-password");

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ data: userData, message: "User profile fetched" });
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal server error" });
        console.log(error);
    }
};

// Update User Profile
const updateUserProfile = async (req, res, next) => {
    try {
        const { name, email, password, mobile, address, profilePic } = req.body;
        const userId = req.user.id;

        const updateData = { name, email, mobile, address, profilePic };

        // Hash new password if provided
        if (password) {
            updateData.password = bcrypt.hashSync(password, 10);
        }

        const updatedUser = await userModel.findByIdAndUpdate(userId, updateData, { new: true }).select("-password");

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ data: updatedUser, message: "User profile updated" });
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal server error" });
        console.log(error);
    }
};

// User Logout
const userLogout = async (req, res, next) => {
    try {
        res.clearCookie("token", { sameSite: "None", secure: true });
        res.json({ message: "User logged out" });
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal server error" });
        console.log(error);
    }
};

// Deactivate User
const userDeactivate = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const user = await userModel.findByIdAndUpdate(userId, { isActive: false }, { new: true });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "Account deactivated successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
        console.log(error);
    }
};

// Check User Authorization
const checkUser = async (req, res, next) => {
    try {
        res.json({ message: "User authorized" });
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal server error" });
    }
};

module.exports = { 
    userSignup, 
    userLogin, 
    userProfile, 
    updateUserProfile, 
    userLogout, 
    userDeactivate, 
    checkUser 
};
