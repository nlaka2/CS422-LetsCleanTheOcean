
// instructions page
function goBack() {
    window.history.back();  // This will navigate to the last page in the history stack
}




function startGame() {
    // Play background audio
    const audio = document.getElementById('background-audio');
    audio.play().catch(error => {
        console.log("Audio autoplay was blocked.");
    });

    // Store game state in local storage
    localStorage.setItem("gameStarted", "true");

    // Store the audio play state
    localStorage.setItem("audioPlaying", "true");

    // Redirect to the gameMap.html page
    window.location.href = "gameMap.html";
}

// Check the game state on page load
function checkGameState() {
    const gameStarted = localStorage.getItem("gameStarted");
    const audioPlaying = localStorage.getItem("audioPlaying");

    // If the game has started and audio is supposed to be playing
    if (gameStarted === "true" && audioPlaying === "true") {
        const audio = document.getElementById('background-audio');
        if (audio.paused) {
            audio.play().catch(error => {
                console.log("Audio autoplay was blocked.");
            });
        }
    }
}

// Run checkGameState on every page load
window.onload = checkGameState();