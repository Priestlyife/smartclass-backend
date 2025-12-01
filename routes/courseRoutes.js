// courseRoutes.js – LESSON ROUTES with native MongoDB

const express = require("express");
const { ObjectId } = require("mongodb");
const { getDB } = require("../db"); 


const router = express.Router();


 /* GET /lessons
 */
router.get("/lessons", async (req, res) => {
  try {
    const db = getDB();
    const lessons = await db.collection("lessons").find({}).toArray();
    res.json(lessons);
  } catch (err) {
    console.error("Error fetching lessons:", err);
    res.status(500).json({ error: "Failed to fetch lessons" });
  }
});

/**

 * so nothing breaks – it just calls the same logic.
 */
router.get("/api/courses", async (req, res) => {
  try {
    const db = getDB();
    const lessons = await db.collection("lessons").find({}).toArray();
    res.json(lessons);
  } catch (err) {
    console.error("Error fetching courses:", err);
    res.status(500).json({ error: "Failed to fetch courses" });
  }
});

/**
 * PUT /lesson/:id
 */
router.put("/lesson/:id", async (req, res) => {
  try {
    const db = getDB();
    const id = req.params.id;

    const updateFields = req.body; // e.g. { space: 7 } or { available: 7 }

    const result = await db.collection("lessons").updateOne(
      { _id: new ObjectId(id) },
      { $set: updateFields }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Lesson not found" });
    }

    res.json({ message: "Lesson updated successfully" });
  } catch (err) {
    console.error("Error updating lesson:", err);
    res.status(500).json({ error: "Failed to update lesson" });
  }
});

module.exports = router;
