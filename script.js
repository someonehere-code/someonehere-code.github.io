document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        let bootSound = new Audio("src/boot.mp3");
        bootSound.volume = 0.7;
        bootSound.play(); 
    }, 2300); 

    setTimeout(() => {
        document.getElementById("desktop").classList.remove("hidden");
    }, 3000);
});

function openWindow(id) {
    let openSound = new Audio("src/open.mp3");
    openSound.volume = 0.7;
    openSound.play();

    let win = document.getElementById(id);
    win.style.display = "block";

    let defaultSizes = {
        "about": { width: 400, height: 250 },
        "projects": { width: 600, height: 400 },
        "contact": { width: 350, height: 200 },
        "mypcshop": { width: 600, height: 400 },
        "mypcshopinfo": { width: 700, height: 400 },
        "bodycamsystem": { width: 700, height: 400 },
        "hireme": { width: 700, height: 300 },
        "experience": { width: 450, height: 200 },
        "outfitsystem": { width: 800, height: 550 },
        "lockersystem": { width: 800, height: 550 },
    };

    if (defaultSizes[id]) {
        win.style.width = `${defaultSizes[id].width}px`;
        win.style.height = `${defaultSizes[id].height}px`;
    }

    win.style.left = `${(window.innerWidth - win.offsetWidth) / 2}px`;
    win.style.top = `${(window.innerHeight - win.offsetHeight) / 2}px`;

    let icon = document.querySelector(`#desktop .icon[onclick="openWindow('${id}')"] img`);
    let iconSrc = icon ? icon.src : "src/blue_screen_of_death.svg"; 

    addToTaskbar(id, iconSrc);
}

function closeWindow(id) {
    let closeSound = new Audio("src/open.mp3");
    closeSound.volume = 0.7;
    closeSound.play();

    document.getElementById(id).style.display = "none";
    removeFromTaskbar(id);
}


function restoreWindow(id) {
    let openSound = new Audio("src/open.mp3");
    openSound.volume = 0.7;
    openSound.play();

    let win = document.getElementById(id);
    win.style.display = "block";

    let currentZIndex = getMaxZIndex() + 1;
    win.style.zIndex = currentZIndex;
}

function getMaxZIndex() {
    let windows = document.querySelectorAll('.window');
    let maxZIndex = 0;

    windows.forEach(win => {
        let zIndex = parseInt(window.getComputedStyle(win).zIndex, 10);
        if (!isNaN(zIndex) && zIndex > maxZIndex) {
            maxZIndex = zIndex;
        }
    });

    return maxZIndex;
}


function addToTaskbar(id, iconSrc) {
    let taskbarItems = document.getElementById("taskbar-items");

    let taskbarButton = document.createElement("div");
    taskbarButton.classList.add("taskbar-item");
    taskbarButton.id = "taskbar-" + id;

    let taskbarIcon = document.createElement("img");
    taskbarIcon.src = iconSrc; 
    taskbarIcon.alt = id;

    let text = document.createElement("span");
    text.innerText = id.charAt(0).toUpperCase() + id.slice(1);

    taskbarButton.appendChild(taskbarIcon);
    taskbarButton.appendChild(text);
    taskbarButton.onclick = () => restoreWindow(id);

    taskbarItems.appendChild(taskbarButton);
}




function removeFromTaskbar(id) {
    let taskbarButton = document.getElementById("taskbar-" + id);
    if (taskbarButton) {
        taskbarButton.remove();
    }
}

document.querySelectorAll(".window").forEach(win => {
    let header = win.querySelector(".window-header");
    let offsetX, offsetY, isDragging = false;

    header.addEventListener("mousedown", (e) => {
        isDragging = true;
        offsetX = e.clientX - win.getBoundingClientRect().left;
        offsetY = e.clientY - win.getBoundingClientRect().top;
    });

    document.addEventListener("mousemove", (e) => {
        if (isDragging) {
            win.style.left = `${e.clientX - offsetX}px`;
            win.style.top = `${e.clientY - offsetY}px`;
        }
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
    });
});

function updateTime() {
    const timeElement = document.getElementById('time');
    
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0'); 
    const minutes = now.getMinutes().toString().padStart(2, '0'); 

    timeElement.textContent = `${hours}:${minutes}`;
}

setInterval(updateTime, 1000);

updateTime();
