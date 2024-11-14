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
    // Check if there is a history entry to go back to
    if (window.history.length > 1) {
        window.history.back(); // If there is a history, go back
    } else {
        // If no history exists, redirect to a default page (e.g., the homepage or game map)
        window.location.href = 'index.html'; // Or any page you want as the fallback
    }
}


function startGame() {
    audio.currentTime = 0;
    // Store game state in local storage
    localStorage.setItem("gameStarted", "true");
    localStorage.setItem("audioPlaying", "true");
    window.location.href = "gameMap.html";
}


// Check the game state on page load (resume audio if needed)
function checkGameState() {
    if (gameStarted === "true" && audioPlaying === "true") {
        if (audio.paused) {
            audio.play().catch(error => {
                console.log("Audio autoplay was blocked.");
            });
        }
    } else {
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

setInterval(() => {
    if (!audio.paused) {
        localStorage.setItem("audioPosition", audio.currentTime); // Store the current playback position
    }
}, 10);

document.body.addEventListener("click", function () {
    document.getElementById("background-audio").play();
}, { once: true });

// Set initial volume to match slider (on first load)
audio.volume = volumeSlider.value;

// main.js

// Function to add item to inventory and save to local storage
function addItemToInventory(imagePath) {
   // Retrieve the current inventory from local storage, or initialize it as an empty array if it doesn't exist
   const inventoryItems = JSON.parse(localStorage.getItem('inventoryItems')) || [];

   // Add the new item to the inventory array (check if it's already added to prevent duplicates)
   if (!inventoryItems.includes(imagePath)) {
       inventoryItems.push(imagePath);
   }

   // Save the updated inventory to local storage
   localStorage.setItem('inventoryItems', JSON.stringify(inventoryItems));

   // Update the inventory display after adding the item
   updateInventoryDisplay();
}

// Function to update the inventory display
function updateInventoryDisplay() {
   const inventoryContainer = document.getElementById('inventory');
   inventoryContainer.innerHTML = ''; // Clear the current inventory

   // Retrieve the current inventory from local storage
   const inventoryItems = JSON.parse(localStorage.getItem('inventoryItems')) || [];
   
   // Check if inventoryItems is empty, and if so, don't add any "random" items
   if (inventoryItems.length === 0) {
       return;  // If no items are in the inventory, don't render anything
   }

   // Loop through the inventory items and display them
   inventoryItems.forEach(itemSrc => {
       const newItem = document.createElement('img');
       newItem.src = itemSrc;
       newItem.classList.add('inv-item');
       newItem.addEventListener('mouseenter', (event) => {
           const itemInfoImg = document.getElementById('item-info');
           itemInfoImg.src = getInfoImage(itemSrc);
           itemInfoImg.style.left = event.pageX + 'px';
       });
       inventoryContainer.appendChild(newItem);
   });
}

// Function to get info image for hover effect (similar to your previous code)
function getInfoImage(imagePath) {
   let infoImagePath = "";
   
   if (imagePath.includes("Glass")) {
       const glassImages = ["Glass.png"];
       infoImagePath = glassImages[Math.floor(Math.random() * glassImages.length)];
   } else if (imagePath.includes("SodaCan")) {
       infoImagePath = "SodaCan.png";
   } else if (imagePath.includes("Plastic")) {
       const plasticImages = ["PlasticBottle.png"];
       infoImagePath = plasticImages[Math.floor(Math.random() * plasticImages.length)];
   }
   
   return ../images/item_info/${infoImagePath};
}

// Load inventory from local storage when the page is loaded
window.addEventListener('DOMContentLoaded', () => {
   updateInventoryDisplay(); // Load the inventory display on page load
});

function clearInventory() {
    // Clear the inventory items from local storage
    localStorage.removeItem('inventoryItems');
}


