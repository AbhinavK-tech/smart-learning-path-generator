const express = require("express");
const cors = require("cors");

const LearningPathOrchestrator =
    require("../backend/agents/orchestrator");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        status: "ok",
        message: "Learning Path Generator API Running"
    });
});

app.post("/generate", async (req, res) => {
    try {
        const {
            goal,
            level,
            commitment,
            language
        } = req.body;

        const orchestrator =
            new LearningPathOrchestrator();

        const result =
            await orchestrator.generate(
                goal,
                level,
                commitment,
                language
            );

        return res.status(200).json(result);

    } catch (err) {
        console.error("Generation Error:", err);

        return res.status(500).json({
            error: err.message
        });
    }
});

module.exports = app;
