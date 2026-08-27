require("dotenv").config();

const Groq = require("groq-sdk");

let groq;

async function askGroq(prompt) {
    if (!process.env.GROQ_API_KEY) {
        throw new Error("GROQ_API_KEY is not defined in the environment variables.");
    }

    if (!groq) {
        groq = new Groq({
            apiKey: process.env.GROQ_API_KEY
        });
    }

    const completion = await groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: prompt
            }
        ],
        model: "llama-3.3-70b-versatile"
    });

    return completion.choices[0].message.content;
}

module.exports = {
    askGroq
};