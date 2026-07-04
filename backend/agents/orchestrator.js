const SkillAssessor = require('./skillAssessor');
const CurriculumDesigner = require('./curriculumDesigner');
const ResourceCurator = require('./resourceCurator');
const ProgressAdvisor = require('./progressAdvisor');

class LearningPathOrchestrator {

  async generate(goal, level, commitment, language) {

    const assessor = new SkillAssessor();
    const designer = new CurriculumDesigner();
    const curator = new ResourceCurator();
    const advisor = new ProgressAdvisor();

    // Step 1: Assess user's skill level
    const assessment = assessor.assess(
      goal,
      level,
      commitment,
      language
    );

    // Step 2: Generate roadmap
    const roadmap = await designer.generateRoadmap(assessment);

    // Step 3: Get learning resources
    const resources = await curator.getResources(
    roadmap,
    assessment
    );

    // Step 4: Generate study advice
    const advice = advisor.generateAdvice(
      goal,
      level,
      commitment
    );

    return {
      assessment,
      roadmap,
      resources,
      advice
    };
  }

}

module.exports = LearningPathOrchestrator;