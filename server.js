require('dotenv').config();

const express = require('express');
const cors = require('cors');

const LearningPathOrchestrator =
require('./backend/agents/orchestrator');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Learning Path Generator API Running');
});

app.post('/generate', async (req, res) => {

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

        res.json(result);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            error: err.message
        });

    }

});

const PORT = 3000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});
