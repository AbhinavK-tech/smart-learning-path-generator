require('dotenv').config();

const { askGemini } =
require('./backend/services/geminiService');

(async () => {

const result = await askGemini(
'Give me a 1 month roadmap to learn Machine Learning'
);

console.log(result);

})();
