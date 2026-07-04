const { askGroq } = require("../services/groqService");

class CurriculumDesigner {

  async generateRoadmap(assessment) {

    const randomSeed = Math.floor(Math.random() * 1000000);

    const prompt = `
You are an expert software engineer, career mentor, and curriculum designer.

Create a COMPLETE personalized learning roadmap.

Career Goal:
${assessment.goal}

Current Experience Level:
${assessment.level}

Weekly Commitment:
${assessment.commitment}

Preferred Language:
${assessment.language}

Random Seed:
${randomSeed}

Generate the roadmap according to the user's experience level.

If Beginner:
- Explain from basics.
- Easy projects.
- Longer roadmap.

If Intermediate:
- Skip basics.
- Focus on practical development.
- Medium difficulty projects.

If Advanced:
- Advanced concepts only.
- Large real-world projects.
- Interview preparation.

Weekly Commitment:

Light (3-5 hrs/week)
- Longer duration
- Less topics per phase

Moderate (10-15 hrs/week)
- Balanced duration

Intensive (20+ hrs/week)
- Short duration
- More topics per phase

IMPORTANT RULES:

1. ALWAYS generate the roadmap in English.

2. Never translate:
- Phase titles
- Topics
- Skills
- Project names
- Project descriptions
- Estimated duration

3. The user's preferred language (${assessment.language}) is ONLY for finding YouTube learning resources.

4. Generate different projects every time.

5. Do NOT repeat projects.

6. Every phase must contain:
- Professional project
- Real-world use case
- Increasing difficulty

7. Topics should contain technology names in English only.
Examples:
- HTML
- CSS
- JavaScript
- React
- Node.js
- Express.js
- MongoDB
- Docker
- Kubernetes

Each phase should contain a professional project.

Projects should become harder in every phase.

Each project must contain:

- name
- description

Return ONLY valid JSON.

{
  "goal":"",
  "language":"",
  "estimatedDuration":"",
  "phases":[
    {
      "phase":1,
      "title":"",
      "duration":"",
      "topics":[],
      "skills":[],
      "project":{
        "name":"",
        "description":""
      }
    }
  ]
}
`;

    try {

      const response = await askGroq(prompt);

      const cleanResponse = response
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      return JSON.parse(cleanResponse);

    } catch (err) {

      console.log("Groq unavailable. Using fallback roadmap.");

      return {

        source: "Fallback",

        goal: assessment.goal,

        language: assessment.language,

        estimatedDuration:
          assessment.commitment === "Light"
            ? "8-10 Months"
            : assessment.commitment === "Moderate"
            ? "5-6 Months"
            : "3-4 Months",

        phases: assessment.recommendedOrder.map((topic, index) => ({

          phase: index + 1,

          title: topic,

          duration:
            assessment.commitment === "Light"
              ? "2 Weeks"
              : assessment.commitment === "Moderate"
              ? "1 Week"
              : "3 Days",

          topics: [topic],

          skills: [topic],

          project: {

            name: `${topic} Project`,

            description: `Build a practical project using ${topic}.`

          }

        }))

      };

    }

  }

}

module.exports = CurriculumDesigner;