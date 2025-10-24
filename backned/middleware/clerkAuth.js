import { createClerkClient } from "@clerk/backend";
import { verifyToken } from "@clerk/backend";

export const clerkAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Missing token" });
    }

    const token = authHeader.split(" ")[1];

    // Use verifyToken directly with the secret key
    const payload = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });

    if (!payload) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    req.userId = payload.sub;
    next();
  } catch (err) {
    console.error("Auth Error:", err.message);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
