// storage.js

const STORAGE_KEY = "learnpath_saved_paths";

/*
Save roadmap
*/
function saveLearningPath(data) {

    let paths = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    // Add current date
    data.savedAt = new Date().toLocaleString();

    paths.unshift(data);

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(paths)
    );

}

/*
Get all saved paths
*/
function getLearningPaths() {

    return JSON.parse(
        localStorage.getItem(STORAGE_KEY)
    ) || [];

}

/*
Delete one roadmap
*/
function deleteLearningPath(index){

    let paths = getLearningPaths();

    paths.splice(index,1);

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(paths)
    );

}

/*
Clear all
*/
function clearLearningPaths(){

    localStorage.removeItem(STORAGE_KEY);

}