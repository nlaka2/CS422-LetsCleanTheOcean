const audio = document.getElementById('background-audio');
const volumeSlider = document.getElementById('volume-slider');
const gameStarted = localStorage.getItem("gameStarted");
const audioPlaying = localStorage.getItem("audioPlaying");

window.onload = checkGameState();

// instructions page
function goBack() {
    window.history.back();  // This will navigate to the last page in the history stack
}




function startGame() {

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

    // If the game has started and audio is supposed to be playing
    if (gameStarted === "true" && audioPlaying === "true") {
        if (audio.paused) {
            audio.play().catch(error => {
                console.log("Audio autoplay was blocked.");
            });
        }
    }
}

// Mute audio and move slider to 0
function muteAudio() {
    audio.muted = true;
    audio.volume = 0;
    volumeSlider.value = 0;
}

// Unmute audio
function unmuteAudio() {
    audio.muted = false;
    audio.volume = volumeSlider.value;
}

// Adjust volume based on slider
function adjustVolume() {
    audio.volume = volumeSlider.value;
    audio.muted = volumeSlider.value == 0;
}

// Set initial volume to match slider
audio.volume = volumeSlider.value;