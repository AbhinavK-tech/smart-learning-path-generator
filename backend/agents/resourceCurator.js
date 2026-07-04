const { searchYouTube } = require("../services/youtubeService");

class ResourceCurator {

  async getResources(roadmap, assessment) {

    const result = [];

    const phases = roadmap.phases || [];

    for (const phase of phases) {

      const searchQuery =
      `${assessment.goal} ${phase.topics.join(" ")}`;
      const videos = await searchYouTube(
          searchQuery,
          assessment.language
      );

      result.push({

        phase: phase.phase,

        title: phase.title,

        duration: phase.duration,

        project: phase.project,

        resources: [

          {
            type: "YouTube",
            videos
          },

          {
            type: "Documentation",
            query: `${phase.title} official documentation`
          },

          {
            type: "Practice",
            query: `${phase.title} exercises`
          }

        ]

      });

    }

    return result;

  }

}

module.exports = ResourceCurator;
