class ProgressAdvisor {
  generateAdvice(goal, level) {
    return {
      dailyStudyTime: "2 hours",
      weeklyGoal: "Complete one roadmap milestone",
      recommendation:
        "Build mini-projects after each phase to reinforce learning.",
      motivation:
        `Stay consistent. ${goal} requires practical experience more than theory.`
    };
  }
}

module.exports = ProgressAdvisor;
