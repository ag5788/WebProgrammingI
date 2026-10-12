console.log("Hello World!");

const name = "Aiden";

let hasDownloadedResume = false;

document.getElementById("download-button").addEventListener("click", () => {
    if(!hasDownloadedResume) {
        hasDownloadedResume = true;
        setTimeout(() => alert('Your download has starting!'), 2e3);
    }
})

/**
 * @param {string} name
 */
function showGreeting(name) {
    return "Hello, my name is " + name + "! Welcome to my portfolio!"
}

document.getElementById("greeting").innerText = showGreeting(name);


function daysUntilDeadline(deadline) {
    const msDistance = new Date(deadline).getTime() - Date.now();
    return msDistance / (24 * 60 * 60e3);
}

const daysRemaining = daysUntilDeadline("December 19, 2026 00:00:00 UTC-7");

console.log("Days remaining until December 19th: ", daysRemaining);
document.getElementById("days-remaining").innerText = Math.round(daysRemaining) + "";