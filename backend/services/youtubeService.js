const axios = require("axios");

async function searchYouTube(query, language) {
    try {
        const apiKey = process.env.YOUTUBE_API_KEY;
        if (!apiKey) {
            console.warn("YOUTUBE_API_KEY is not defined. Skipping YouTube search.");
            return [];
        }

        const languageMap = {
            English: "English",
            Tamil: "Tamil",
            Hindi: "Hindi",
            Telugu: "Telugu",
            Kannada: "Kannada",
            Malayalam: "Malayalam",
            Bengali: "Bengali",
            Marathi: "Marathi",
            Gujarati: "Gujarati",
            French: "French",
            German: "German",
            Spanish: "Spanish",
            Japanese: "Japanese",
            Korean: "Korean",
            Chinese: "Chinese"
        };

        const langName = languageMap[language];
        const langSuffix = langName ? `in ${langName}` : "";
        const finalQuery = `${query} programming tutorial ${langSuffix}`.trim();

        const url =
            "https://www.googleapis.com/youtube/v3/search" +
            "?part=snippet" +
            "&type=video" +
            "&videoEmbeddable=true" +
            "&maxResults=3" +
            "&order=relevance" +
            "&regionCode=IN" +
            "&q=" + encodeURIComponent(finalQuery) +
            "&key=" + apiKey;

        const response = await axios.get(url);

        if (!response.data || !response.data.items) {
            return [];
        }

        return response.data.items.map(item => ({
            title: item.snippet.title,
            videoId: item.id.videoId,
            channel: item.snippet.channelTitle
        }));
    } catch (err) {
        console.error("YouTube Search Failed:", err.message);
        return [];
    }
}

module.exports = {
    searchYouTube
};