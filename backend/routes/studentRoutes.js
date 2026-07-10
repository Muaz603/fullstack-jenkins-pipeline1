const express = require("express");
const router = express.Router();

const db = require("../config/db");

// GET /api/students
router.get("/students", async (req, res) => {
    try {

        const [rows] = await db.query(
            "SELECT * FROM students"
        );

        res.json(rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Database Error"
        });

    }
});

module.exports = router;