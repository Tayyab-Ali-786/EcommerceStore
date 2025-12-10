const userModel = require("../../models/user");

const addUser = async (req, res, next) => {
  try {
    const { name, email, password, isAdmin } = req.body || {};

    // Basic validation
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "name, email and password are required" });
    }

    const normalizedEmail = String(email).toLowerCase().trim();

    // Check duplicate email
    const existing = await userModel.findOne({ email: normalizedEmail });
    if (existing) {
      return res.status(409).json({ success: false, message: "Email already in use" });
    }

    // Create user (password will be hashed by pre-save hook in model)
    const user = new userModel({
      name: String(name).trim(),
      email: normalizedEmail,
      password,
      isAdmin: !!isAdmin,
    });

    await user.save();

    // Generate tokens if model methods available
    let accessToken = null;
    let refreshToken = null;

    try {
      if (typeof user.generateAccessToken === "function") {
        accessToken = user.generateAccessToken();
      }
      if (typeof user.generateRefreshToken === "function") {
        refreshToken = user.generateRefreshToken();
      }
    } catch (tokenErr) {
      // don't block user creation if token generation fails
      console.error("Token generation error:", tokenErr);
    }

    // Persist refresh token in user doc if generated
    if (refreshToken) {
      user.refreshTokens = user.refreshTokens || [];
      user.refreshTokens.push({ token: refreshToken });
      // avoid re-hashing password on save by using updateOne
      await userModel.updateOne({ _id: user._id }, { $set: { refreshTokens: user.refreshTokens } });
    }

    // Prepare safe user object for response
    const userObj = user.toObject ? user.toObject() : { ...user };
    delete userObj.password;
    // you may choose not to return refreshTokens array
    delete userObj.refreshTokens;

    return res.status(201).json({
      success: true,
      message: "User created",
      user: userObj,
      tokens: { accessToken, refreshToken },
    });
  } catch (error) {
    console.error("Add User Error:", error);

    // Handle duplicate key error (race condition)
    if (error && error.code === 11000) {
      return res.status(409).json({ success: false, message: "Email already exists" });
    }

    return res.status(500).json({ success: false, message: error.message || "Server error" });
  }
};

module.exports = addUser;
