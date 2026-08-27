const axios = require("axios");

function getCuratedVideos(query) {
    const q = query.toLowerCase();
    
    if (q.includes("python")) {
        return [
            {
                title: "Python for Beginners - Full Crash Course (Programming with Mosh)",
                videoId: "kqtD5dpn9C8",
                channel: "Programming with Mosh"
            },
            {
                title: "Learn Python - Full Course for Beginners",
                videoId: "rfscVS0vtbw",
                channel: "freeCodeCamp.org"
            }
        ];
    }
    if (q.includes("linear algebra")) {
        return [
            {
                title: "Linear Algebra for Beginners - Full College Course",
                videoId: "7e9O4uM2h2I",
                channel: "freeCodeCamp.org"
            }
        ];
    }
    if (q.includes("statistics")) {
        return [
            {
                title: "Statistics - A Full University Course on Data Science Basics",
                videoId: "XXcnWw96SZ8",
                channel: "freeCodeCamp.org"
            }
        ];
    }
    if (q.includes("deep learning")) {
        return [
            {
                title: "Deep Learning Crash Course for Beginners",
                videoId: "gZmOb80655g",
                channel: "freeCodeCamp.org"
            }
        ];
    }
    if (q.includes("machine learning") || q.includes("ml")) {
        return [
            {
                title: "Machine Learning Course for Beginners",
                videoId: "GwIo3gDZUtQ",
                channel: "freeCodeCamp.org"
            }
        ];
    }
    if (q.includes("html")) {
        return [
            {
                title: "HTML Tutorial for Beginners - HTML5 Crash Course",
                videoId: "ok-plXXHlWw",
                channel: "Programming with Mosh"
            }
        ];
    }
    if (q.includes("css")) {
        return [
            {
                title: "CSS Tutorial for Beginners - Complete Crash Course",
                videoId: "wHAqtgpK_bg",
                channel: "Programming with Mosh"
            }
        ];
    }
    if (q.includes("javascript") || q.includes("js")) {
        return [
            {
                title: "JavaScript Tutorial for Beginners: Learn JS in 1 Hour",
                videoId: "W6NZ1r08b78",
                channel: "Programming with Mosh"
            }
        ];
    }
    if (q.includes("react")) {
        return [
            {
                title: "ReactJS Tutorial for Beginners - Full Course",
                videoId: "Ke90Tje7VS0",
                channel: "Programming with Mosh"
            }
        ];
    }
    if (q.includes("node")) {
        return [
            {
                title: "Node.js Tutorial for Beginners: Learn Node in 1 Hour",
                videoId: "TbQn9_j8M20",
                channel: "Programming with Mosh"
            }
        ];
    }
    if (q.includes("mongodb") || q.includes("mongo")) {
        return [
            {
                title: "MongoDB Complete Tutorial - Database Crash Course",
                videoId: "ofme2o290d4",
                channel: "freeCodeCamp.org"
            }
        ];
    }
    if (q.includes("docker")) {
        return [
            {
                title: "Docker Tutorial for Beginners [Full Course]",
                videoId: "pTFZFxd4hOI",
                channel: "Programming with Mosh"
            }
        ];
    }
    if (q.includes("kubernetes")) {
        return [
            {
                title: "Kubernetes Tutorial for Beginners [Full Course]",
                videoId: "d6yC5adIpUM",
                channel: "TechWorld with Nana"
            }
        ];
    }

    // Default general learning video fallback
    return [
        {
            title: "How to Learn Code Faster & Master Any Tech Stack",
            videoId: "F3LgdSrkQec",
            channel: "Clément Mihailescu"
        }
    ];
}

async function searchYouTube(query, language) {
    try {
        const apiKey = process.env.YOUTUBE_API_KEY;
        if (!apiKey) {
            console.warn("YOUTUBE_API_KEY is not defined. Using curated fallback video.");
            return getCuratedVideos(query);
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

        if (!response.data || !response.data.items || response.data.items.length === 0) {
            return getCuratedVideos(query);
        }

        return response.data.items.map(item => ({
            title: item.snippet.title,
            videoId: item.id.videoId,
            channel: item.snippet.channelTitle
        }));
    } catch (err) {
        console.error("YouTube Search Failed, using curated fallback:", err.message);
        return getCuratedVideos(query);
    }
}

module.exports = {
    searchYouTube
};