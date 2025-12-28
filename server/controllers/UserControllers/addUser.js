const userModel = require("../../models/user");

const fetch = global.fetch; // Node 18+
const EXTERNAL_URL =
  "https://ecommercestore-backend-4p55.onrender.com/addUser";
const API_KEY = process.env.ADD_USER_API_KEY;

const addUser = async (req, res) => {
  try {
    // Allow cross-origin requests to this server and handle preflight
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-api-key");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    if (req.method === "OPTIONS") return res.sendStatus(204);

    const { name, email, password, phone, isAdmin } = req.body || {};

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

    // If external API key + URL available, try server-to-server call; otherwise create locally.
    if (API_KEY && EXTERNAL_URL && process.env.FORCE_LOCAL !== "true") {
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
          phone,
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
    }

    // Local creation fallback (avoids browser CORS to external endpoint)
    const newUser = await userModel.create({
      name,
      email: normalizedEmail,
      password,
      phone,
      isAdmin: Boolean(isAdmin)
    });

    return res.status(201).json({
      success: true,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        isAdmin: newUser.isAdmin
      }
    });
  } catch (error) {
    console.error("AddUser Error Detailed:", error);

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
