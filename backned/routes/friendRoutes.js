import express from "express";

const router = express.Router();

// GET - Fetch friends and requests
router.get("/", async (req, res) => {
  try {
    res.json({
      friends: [
        { id: "1", firstName: "Alice", lastName: "Smith", profileImageUrl: "/assets/images/logo.png", lastMessage: "Hey!" },
        { id: "4", firstName: "Alice", lastName: "Smith", profileImageUrl: "/assets/images/logo.png", lastMessage: "Hey!" },
        { id: "5", firstName: "Alice", lastName: "Smith", profileImageUrl: "/assets/images/logo.png", lastMessage: "Hey!" },
        { id: "6", firstName: "Alice", lastName: "Smith", profileImageUrl: "/assets/images/logo.png", lastMessage: "Hey!" },
        { id: "7", firstName: "Alice", lastName: "Smith", profileImageUrl: "/assets/images/logo.png", lastMessage: "Hey!" },
        { id: "8", firstName: "Alice", lastName: "Smith", profileImageUrl: "/assets/images/logo.png", lastMessage: "Hey!" },
        { id: "2", firstName: "Bob", lastName: "Johnson", profileImageUrl: "/assets/images/logo.png", lastMessage: "Yo!" },
      ],
      requests: [
        { id: "3", firstName: "Charlie", lastName: "Brown", profileImageUrl: "/assets/images/logo.png" },
      ],
    });
  } catch (error) {
    console.error("Error in friends route:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST - Add a new friend request
router.post("/", async (req, res) => {
  try {
    const { friendId } = req.body;
    const userId = req.userId; // From clerkAuth middleware

    if (!friendId) {
      return res.status(400).json({ message: "Friend ID is required" });
    }

    // TODO: Add your logic to send friend request to database
    console.log(`User ${userId} sending friend request to ${friendId}`);

    res.status(201).json({
      message: "Friend request sent successfully",
      friendId
    });
  } catch (error) {
    console.error("Error sending friend request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST - Accept friend request
router.post("/accept", async (req, res) => {
  try {
    const { requestId } = req.body;
    const userId = req.userId;

    if (!requestId) {
      return res.status(400).json({ message: "Request ID is required" });
    }

    // TODO: Add your logic to accept friend request
    console.log(`User ${userId} accepting friend request ${requestId}`);

    res.json({
      message: "Friend request accepted",
      requestId
    });
  } catch (error) {
    console.error("Error accepting friend request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST - Decline friend request
router.post("/decline", async (req, res) => {
  try {
    const { requestId } = req.body;
    const userId = req.userId;

    if (!requestId) {
      return res.status(400).json({ message: "Request ID is required" });
    }

    // TODO: Add your logic to decline friend request
    console.log(`User ${userId} declining friend request ${requestId}`);

    res.json({
      message: "Friend request declined",
      requestId
    });
  } catch (error) {
    console.error("Error declining friend request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE - Remove a friend
router.delete("/:friendId", async (req, res) => {
  try {
    const { friendId } = req.params;
    const userId = req.userId;

    // TODO: Add your logic to remove friend
    console.log(`User ${userId} removing friend ${friendId}`);

    res.json({
      message: "Friend removed successfully",
      friendId
    });
  } catch (error) {
    console.error("Error removing friend:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
