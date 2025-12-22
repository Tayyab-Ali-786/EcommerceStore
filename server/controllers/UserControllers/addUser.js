const userModel = require("../../models/user");

const fetch = global.fetch; // Node 18+
const EXTERNAL_URL =
  "https://ecommercestore-backend-4p55.onrender.com/addUser";
const API_KEY = process.env.ADD_USER_API_KEY;

const addUser = async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body || {};

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "name, email and password are required" });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existing = await userModel.findOne({ email: normalizedEmail });
    if (existing) {
      return res.status(409).json({ success: false, message: "Email already in use" });
    }

    if (!API_KEY) {
      return res.status(500).json({ success: false, message: "Server misconfiguration: missing API key" });
    }

    const controller = new AbortController();
    setTimeout(() => controller.abort(), 10000);

    const externalRes = await fetch(EXTERNAL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY
      },
      body: JSON.stringify({
        name,
        email: normalizedEmail,
        password,
        isAdmin: Boolean(isAdmin)
      }),
      signal: controller.signal
    });

    const externalData = await externalRes.json().catch(() => null);

    if (!externalRes.ok) {
      return res
        .status(externalRes.status)
        .json(externalData || { success: false, message: "External service error" });
    }

    return res.status(externalRes.status).json(externalData);
  } catch (error) {
    console.error("AddUser Error:", error);

    if (error?.code === 11000) {
      return res.status(409).json({ success: false, message: "Email already exists" });
    }

    return res.status(500).json({
      success: false,
      message:
        error.name === "AbortError"
          ? "External service timeout"
          : error.message || "Server error"
    });
  }
};

module.exports = addUser;
