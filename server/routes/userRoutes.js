const express = require("express");
const { requireAuth, getAuth, clerkClient } = require("@clerk/express");
const User = require("../models/User");

const router = express.Router();

// Apply Clerk requireAuth middleware to all routes in this router
router.use(requireAuth());

// POST /api/user/profile - Upsert user profile
router.post("/profile", async (req, res) => {
  try {
    const { userId: clerkUserId } = getAuth(req);
    const { name, bio } = req.body;

    // Validate input
    if (typeof name !== "string" || typeof bio !== "string") {
      return res.status(400).json({ error: "Invalid input" });
    }

    // Upsert the profile
    const profile = await User.findOneAndUpdate(
      { clerkUserId },
      { name, bio },
      { new: true, upsert: true, runValidators: true }
    );

    res.json({ success: true, profile });
  } catch (error) {
    console.error("Error saving profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/user/profile - Fetch user profile with Clerk metadata
router.get("/profile", async (req, res) => {
  try {
    const { userId: clerkUserId } = getAuth(req);

    // Fetch profile from DB
    const profile = await User.findOne({ clerkUserId });

    // Fetch Clerk user metadata
    const clerkUser = await clerkClient.users.getUser(clerkUserId);
    const clerkMetadata = {
      email: clerkUser.emailAddresses[0]?.emailAddress,
      firstName: clerkUser.firstName,
      lastName: clerkUser.lastName,
      imageUrl: clerkUser.imageUrl,
    };

    // Merge profile data with Clerk metadata
    const userData = {
      ...clerkMetadata,
      ...profile?.toObject(),
      clerkUserId,
    };

    res.json({ user: userData });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
