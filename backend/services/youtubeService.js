const axios = require("axios");

function getCuratedVideos(query, language) {
    const q = query.toLowerCase();
    const lang = (language || "English").toLowerCase();

    // Python Curated
    if (q.includes("python")) {
        if (lang === "tamil") {
            return [{
                title: "Python in Tamil | Full Course for Beginners (Error Makes Clever)",
                videoId: "mB2Z9K09ZlE",
                channel: "Error Makes Clever Academy"
            }];
        } else if (lang === "hindi") {
            return [{
                title: "Python Tutorial in Hindi (Full Course) - CodeWithHarry",
                videoId: "7wnove7K-Yg",
                channel: "CodeWithHarry"
            }];
        } else if (lang === "telugu") {
            return [{
                title: "Python Course in Telugu for Beginners (Kiran Gutta)",
                videoId: "L7E3M1qA32A",
                channel: "Kiran Gutta"
            }];
        } else {
            return [{
                title: "Python for Beginners - Full Course (Programming with Mosh)",
                videoId: "kqtD5dpn9C8",
                channel: "Programming with Mosh"
            }];
        }
    }

    // HTML Curated
    if (q.includes("html")) {
        if (lang === "tamil") {
            return [{
                title: "HTML Tutorial in Tamil for Beginners (Error Makes Clever)",
                videoId: "P1a3c7z3tM0",
                channel: "Error Makes Clever Academy"
            }];
        } else if (lang === "hindi") {
            return [{
                title: "HTML Tutorial in Hindi (Full Course) - CodeWithHarry",
                videoId: "BsDoLVMutNE",
                channel: "CodeWithHarry"
            }];
        } else {
            return [{
                title: "HTML Tutorial for Beginners - HTML5 Crash Course (Mosh)",
                videoId: "ok-plXXHlWw",
                channel: "Programming with Mosh"
            }];
        }
    }

    // CSS Curated
    if (q.includes("css")) {
        if (lang === "tamil") {
            return [{
                title: "CSS Tutorial in Tamil for Beginners (Error Makes Clever)",
                videoId: "n3Z99D9f2k0",
                channel: "Error Makes Clever Academy"
            }];
        } else if (lang === "hindi") {
            return [{
                title: "CSS Tutorial in Hindi (Full Course) - CodeWithHarry",
                videoId: "ESnrn1kAD4w",
                channel: "CodeWithHarry"
            }];
        } else {
            return [{
                title: "CSS Tutorial for Beginners - Complete Crash Course (Mosh)",
                videoId: "wHAqtgpK_bg",
                channel: "Programming with Mosh"
            }];
        }
    }

    // JavaScript Curated
    if (q.includes("javascript") || q.includes("js")) {
        if (lang === "tamil") {
            return [{
                title: "JavaScript Tutorial in Tamil for Beginners (Error Makes Clever)",
                videoId: "t23mB8kZl3e",
                channel: "Error Makes Clever Academy"
            }];
        } else if (lang === "hindi") {
            return [{
                title: "JavaScript Course in Hindi for Beginners - CodeWithHarry",
                videoId: "chx9Rz3f_cQ",
                channel: "CodeWithHarry"
            }];
        } else {
            return [{
                title: "JavaScript Tutorial for Beginners: Learn JS in 1 Hour (Mosh)",
                videoId: "W6NZ1r08b78",
                channel: "Programming with Mosh"
            }];
        }
    }

    // React Curated
    if (q.includes("react")) {
        if (lang === "tamil") {
            return [{
                title: "React JS Tutorial in Tamil (Error Makes Clever)",
                videoId: "dGcsHMXbSOA",
                channel: "Error Makes Clever Academy"
            }];
        } else if (lang === "hindi") {
            return [{
                title: "React JS Tutorial in Hindi for Beginners - CodeWithHarry",
                videoId: "RGKi6LSPDLU",
                channel: "CodeWithHarry"
            }];
        } else {
            return [{
                title: "ReactJS Tutorial for Beginners - Full Course (Mosh)",
                videoId: "Ke90Tje7VS0",
                channel: "Programming with Mosh"
            }];
        }
    }

    // Statistics Curated
    if (q.includes("statistics")) {
        if (lang === "hindi") {
            return [{
                title: "Statistics for Data Science in Hindi",
                videoId: "V5eE1gK7n3M",
                channel: "WSCube Tech"
            }];
        } else {
            return [{
                title: "Statistics - A Full University Course on Data Science Basics",
                videoId: "XXcnWw96SZ8",
                channel: "freeCodeCamp.org"
            }];
        }
    }

    // Linear Algebra Curated
    if (q.includes("linear algebra")) {
        if (lang === "hindi") {
            return [{
                title: "Linear Algebra in Hindi (Full Course)",
                videoId: "8V3y9eYqA3U",
                channel: "Gajendra Purohit"
            }];
        } else {
            return [{
                title: "Linear Algebra for Beginners - Full College Course",
                videoId: "7e9O4uM2h2I",
                channel: "freeCodeCamp.org"
            }];
        }
    }

    // Machine Learning / AI
    if (q.includes("machine learning") || q.includes("ml") || q.includes("ai")) {
        if (lang === "hindi") {
            return [{
                title: "Machine Learning Tutorial in Hindi - Complete Course",
                videoId: "GwIo3gDZUtQ",
                channel: "CodeWithHarry"
            }];
        } else if (lang === "tamil") {
            return [{
                title: "Machine Learning Tutorial in Tamil (Full Course)",
                videoId: "mD2z9k09ZlE",
                channel: "Error Makes Clever Academy"
            }];
        } else {
            return [{
                title: "Machine Learning Course for Beginners",
                videoId: "GwIo3gDZUtQ",
                channel: "freeCodeCamp.org"
            }];
        }
    }

    // Default general learning video
    return [
        {
            title: `Learn ${query} Tutorial`,
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
            return getCuratedVideos(query, language);
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
            return getCuratedVideos(query, language);
        }

        return response.data.items.map(item => ({
            title: item.snippet.title,
            videoId: item.id.videoId,
            channel: item.snippet.channelTitle
        }));
    } catch (err) {
        console.error("YouTube Search Failed, using curated fallback:", err.message);
        return getCuratedVideos(query, language);
    }
}

module.exports = {
    searchYouTube
};