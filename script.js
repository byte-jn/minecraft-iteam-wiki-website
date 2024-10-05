// Select all video elements in the boxes
const videos = document.querySelectorAll('.box video');

videos.forEach(video => {
    const box = video.parentElement;

    box.addEventListener('mouseenter', () => {
        video.play();
    });

    box.addEventListener('mouseleave', () => {
        video.pause();
    });

    video.addEventListener('ended', () => {
        video.currentTime = 0;
        video.play();
    });
});

// Select all video elements in the boxes
const videos2 = document.querySelectorAll('.box2 video');

videos2.forEach(video2 => {
    const box = video2.parentElement;

    box.addEventListener('mouseenter', () => {
        video2.play();
    });

    box.addEventListener('mouseleave', () => {
        video2.pause();
    });

    video.addEventListener('ended', () => {
        video2.currentTime = 0;
        video2.play();
    });
});

// Funktion zum Setzen eines Cookies
function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

// Funktion zum Lesen eines Cookies
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
}

// Funktion zum Löschen eines Cookies
function deleteCookie(name) {
    setCookie(name, '', -1); // Setzen Sie das Ablaufdatum in die Vergangenheit
}

// Funktion zum Anzeigen der letzten ausgewählten Elemente
function showLastSelectedItems() {
    const lastItems = JSON.parse(getCookie('lastItems') || '[]');
    renderLastSelectedItems(lastItems);
}

// Funktion zum Öffnen eines Elements
async function openItem(itemName) {
    const loadingSpinner = document.getElementById('loading-spinner');
    loadingSpinner.style.display = 'block';

    try {
        const response = await fetch('https://minecraft-api.vercel.app/api/items');
        if (!response.ok) throw new Error("Netzwerkantwort war nicht ok");

        const items = await response.json();
        const item = items.find(i => i.name === decodeURIComponent(itemName));

        loadingSpinner.style.display = 'none';

        if (item) {
            updateLastSelectedItems(item);
            alert(`You opened: ${item.name}`);
        } else {
            alert("Item not found.");
        }
    } catch (error) {
        loadingSpinner.style.display = 'none';
        alert(`Fehler beim Laden der Daten: ${error.message}`);
    }
}

// Funktion zum Aktualisieren der letzten ausgewählten Elemente
function updateLastSelectedItems(item) {
    let lastItems = JSON.parse(getCookie('lastItems') || '[]');

    lastItems = lastItems.filter(i => i.name !== item.name);
    lastItems.unshift({ name: item.name, image: item.image });

    if (lastItems.length > 5) {
        lastItems.pop();
    }

    setCookie('lastItems', JSON.stringify(lastItems), 1); // Cookie in 1 Tag ablaufen lassen
}

// Funktion zum Erstellen eines neuen Items
function create(input) {
    if (input) {
        window.location.href = `item-details.html?item=${encodeURIComponent(input)}`;
    }
}

// Anruf zum Anzeigen der letzten ausgewählten Elemente beim Laden der Seite
window.onload = showLastSelectedItems;
