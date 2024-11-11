const audio = document.getElementById('background-audio');
const volumeSlider = document.getElementById('volume-slider');
let gameStarted = localStorage.getItem("gameStarted");
let audioPlaying = localStorage.getItem("audioPlaying");
let audioPosition = localStorage.getItem("audioPosition");
const savedPosition = localStorage.getItem("audioPosition");

window.onload = function() {
    checkGameState();
    loadVolume(); // Load the volume from storage
    loadAudioPosition(); // Load audio position from storage
};

// Instructions page: Go back to the previous page
function goBack() {
    window.history.back(); // This will navigate to the last page in the history stack
}

// Function to start the game and play audio
function startGame() {
    // Play background audio
    audio.currentTime = 0;
    
    audio.play().catch(error => {
        console.log("Audio autoplay was blocked.");
    });

    // Store game state in local storage
    localStorage.setItem("gameStarted", "true");

    // Store the audio play state
    localStorage.setItem("audioPlaying", "true");

    // Store the audio position and volume state
    localStorage.setItem("audioPosition", audio.currentTime); // Save current audio position
    localStorage.setItem("audioVolume", volumeSlider.value);

    // Redirect to the gameMap.html page
    window.location.href = "gameMap.html";
}

// Check the game state on page load (resume audio if needed)
function checkGameState() {
    if (gameStarted === "true" && audioPlaying === "true") {
        // Ensure the audio is playing if it was previously playing
        if (audio.paused) {
            audio.play().catch(error => {
                console.log("Audio autoplay was blocked.");
            });
        }
    } else {
        // If audio is not supposed to play, stop it
        audio.pause();
    }
}

// Mute audio and move slider to 0
function muteAudio() {
    audio.muted = true;
    audio.volume = 0;
    volumeSlider.value = 0;
    localStorage.setItem("audioVolume", 0); // Store the muted volume state
}

// Unmute audio
function unmuteAudio() {
    audio.muted = false;
    audio.volume = volumeSlider.value;
    localStorage.setItem("audioVolume", volumeSlider.value); // Store the unmuted volume state
}

// Adjust volume based on slider
function adjustVolume() {
    audio.volume = volumeSlider.value;
    audio.muted = volumeSlider.value == 0;
    localStorage.setItem("audioVolume", volumeSlider.value); // Store the updated volume state
}

// Load the saved volume state from localStorage
function loadVolume() {
    const savedVolume = localStorage.getItem("audioVolume");
    if (savedVolume !== null) {
        volumeSlider.value = savedVolume;
        audio.volume = savedVolume;
        audio.muted = savedVolume == 0; // Mute if volume is 0
    }
}

// Load the saved audio position from localStorage
function loadAudioPosition() {
    if (savedPosition !== null) {
        audio.currentTime = savedPosition; // Set audio position to the saved position
    }
}

// Save the audio position periodically (every 5 seconds in this example)
setInterval(() => {
    if (!audio.paused) {
        localStorage.setItem("audioPosition", audio.currentTime); // Store the current playback position
    }
}, 10); // Save position every 5 seconds

// Set initial volume to match slider (on first load)
audio.volume = volumeSlider.value;
