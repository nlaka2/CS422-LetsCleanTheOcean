const audio = document.getElementById('background-audio');
const volumeSlider = document.getElementById('volume-slider');
let gameStarted = localStorage.getItem("gameStarted");
let audioPlaying = localStorage.getItem("audioPlaying");
let audioPosition = localStorage.getItem("audioPosition");
const volumeDisplay = document.getElementById('volume-level');
const savedVolume = localStorage.getItem("audioVolume") || 0.7;

window.onload = function() {
    checkGameState();
    loadVolume(); // Load the volume from storage
};

// Instructions page: Go back to the previous page
function goBack() {
    window.history.back(); // This will navigate to the last page in the history stack
}

function startGame() {
    // Reset the audio position to the beginning
    audio.currentTime = 0;
    // Store game state in local storage
    localStorage.setItem("gameStarted", "true");
    // Store the audio play state
    localStorage.setItem("audioPlaying", "true");
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

function adjustVolume() {
    const volume = parseFloat(volumeSlider.value);
    audio.volume = volume;
    volumeDisplay.textContent = Math.round(volume * 10);
    localStorage.setItem("audioVolume", volume);
    localStorage.setItem("audioMuted", audio.muted);
}

function loadVolume() {
    const savedVolume = localStorage.getItem("audioVolume");
    const isMuted = localStorage.getItem("audioMuted") === 'true';

    if (savedVolume !== null) {
        audio.volume = parseFloat(savedVolume);
        volumeSlider.value = savedVolume;
        volumeDisplay.textContent = Math.round(savedVolume * 10);
    }

    audio.muted = isMuted;
    if (isMuted) {
        volumeSlider.value = 0;
        volumeDisplay.textContent = 0;
    }
}

function muteAudio() {
    audio.muted = true;
    volumeSlider.value = 0;
    volumeDisplay.textContent = 0;
    localStorage.setItem("audioMuted", true);
}

function unmuteAudio() {
    audio.muted = false;
    const savedVolume = localStorage.getItem("audioVolume") || 0.7;
    audio.volume = savedVolume;
    volumeSlider.value = savedVolume;
    volumeDisplay.textContent = Math.round(savedVolume * 10);
    localStorage.setItem("audioMuted", false);
}

// Save the audio position periodically (every 5 seconds in this example)
setInterval(() => {
    if (!audio.paused) {
        localStorage.setItem("audioPosition", audio.currentTime); // Store the current playback position
    }
}, 10); // Save position every 5 seconds

// Set initial volume to match slider (on first load)
audio.volume = volumeSlider.value;




const trashImages = [
    '../images/collecting/Glass.png',
    '../images/collecting/SodaCan.png',
    '../images/collecting/PlasticBottle.png'
];

// Function to create and display a trash image
function showTrashImage(imagePath) {
    const trashContainer = document.getElementById('trashContainer');

    // Create img element
    const img = document.createElement('img');
    img.src = imagePath;
    img.classList.add('trash-item');

    // Randomize position within the container
    img.style.top = `${Math.random() * 70}vh`;
    img.style.left = `${Math.random() * 90}vw`;

    trashContainer.appendChild(img);

    // Remove the image after a few seconds
    setTimeout(() => {
        img.style.opacity = 0;
        setTimeout(() => trashContainer.removeChild(img), 1000);
    }, 4000); // Display for 4 seconds
}

// Display each trash image at different intervals
function displayTrashImages() {
    // Show each trash image with a delay
    trashImages.forEach((imagePath, index) => {
        setTimeout(() => {
            showTrashImage(imagePath);
        }, index * 2000); // Adjust delay between images (2000ms or 2 seconds)
    });
}