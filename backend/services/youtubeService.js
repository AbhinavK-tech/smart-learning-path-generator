const axios = require("axios");

async function searchYouTube(query, language) {

    const apiKey = process.env.YOUTUBE_API_KEY;

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

    const finalQuery =
    `${query} programming tutorial ${languageMap[language]}`;

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

    return response.data.items.map(item => ({
        title: item.snippet.title,
        videoId: item.id.videoId,
        channel: item.snippet.channelTitle
    }));

}

module.exports = {
    searchYouTube
};