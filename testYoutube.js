require('dotenv').config();

const { searchYouTube } =
  require('./backend/services/youtubeService');

(async () => {
  try {
    const videos =
      await searchYouTube('Python Fundamentals');

    console.log(videos);
  } catch (err) {
    console.error(
      err.response?.data || err.message
    );
  }
})();
