const express = require("express");
const cors = require("cors");

const studentRoutes = require("./routes/studentRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Health Check Endpoint
const db = require("./config/db");

// Health Check Endpoint
app.get("/health", async (req, res) => {

    try {

        await db.query("SELECT 1");

        res.json({
            status: "UP",
            database: "Connected"
        });

    } catch (error) {

        res.status(500).json({
            status: "DOWN",
            database: "Disconnected"
        });

    }

});

// Student API
app.use("/api", studentRoutes);

// Default Route
app.get("/", (req, res) => {
    res.send("Full Stack Jenkins Backend");
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});