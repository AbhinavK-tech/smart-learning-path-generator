const LearningPathOrchestrator = require("../backend/agents/orchestrator");

module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Handle Preflight
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    // Allow only POST
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    try {
        const {
            goal,
            level,
            commitment,
            language
        } = req.body || {};

        // Validate input
        if (!goal || !level || !commitment || !language) {
            return res.status(400).json({
                error: "Missing required fields"
            });
        }

        const orchestrator = new LearningPathOrchestrator();

        const result = await orchestrator.generate(
            goal,
            level,
            commitment,
            language
        );

        return res.status(200).json(result);

    } catch (error) {
        console.error("Backend Error:", error);

        return res.status(500).json({
            error: error.message || "Internal server error"
        });
    }
};
