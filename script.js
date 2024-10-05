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

// Select all video elements in the boxes2
const videos2 = document.querySelectorAll('.box2 video');

videos2.forEach(video2 => {
    const box = video2.parentElement;

    box.addEventListener('mouseenter', () => {
        video2.play();
    });

    box.addEventListener('mouseleave', () => {
        video2.pause();
    });

    video2.addEventListener('ended', () => {
        video2.currentTime = 0;
        video2.play();
    });
});

// Funktion, um zu überprüfen, ob Cookies aktiviert sind
function areCookiesEnabled() {
    document.cookie = "testcookie";
    const cookiesEnabled = document.cookie.indexOf("testcookie") !== -1;
    deleteCookie("testcookie"); // Bereinige nach dem Test
    return cookiesEnabled;
}

// Funktion zum Setzen eines Cookies
function setCookie(name, value, days) {
    if (!areCookiesEnabled()) {
        console.warn("Cookies sind in diesem Browser nicht aktiviert.");
        return;
    }
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
    console.log(`Cookie gesetzt: ${name}=${value}, läuft in ${days} Tagen ab`);
}

// Funktion zum Lesen eines Cookies
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        const cookieValue = decodeURIComponent(parts.pop().split(';').shift());
        console.log(`Cookie gelesen: ${name}=${cookieValue}`);
        return cookieValue;
    }
    console.warn(`Cookie nicht gefunden: ${name}`);
    return null; // Rückgabe null, wenn das Cookie nicht gefunden wird
}

// Funktion zum Löschen eines Cookies
function deleteCookie(name) {
    setCookie(name, '', -1); // Setze das Ablaufdatum in die Vergangenheit
}

// Funktion zum Anzeigen der letzten ausgewählten Elemente
function showLastSelectedItems() {
    const lastItems = JSON.parse(getCookie('lastItems') || '[]');
    renderLastSelectedItems(lastItems);
}

// Funktion zum Rendern der letzten ausgewählten Elemente
function renderLastSelectedItems(items) {
    const lastItemsContainer = document.getElementById('last-selected-items');
    lastItemsContainer.innerHTML = ''; // Container zuerst leeren

    if (items.length === 0) {
        lastItemsContainer.innerHTML = "<p>Keine letzten Suchanfragen.</p>";
    } else {
        items.forEach(item => {
            // Direkt das Bild-Element erstellen
            const img = document.createElement('img');
            img.src = item.image;
            img.alt = item.name;
            img.onclick = () => create(encodeURIComponent(item.name)); // Onclick-Funktion zuweisen
            
            // Das Bild dem Container hinzufügen
            lastItemsContainer.appendChild(img);
        });
    }
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
            alert(`Du hast geöffnet: ${item.name}`);
        } else {
            alert("Element nicht gefunden.");
        }
    } catch (error) {
        loadingSpinner.style.display = 'none';
        alert(`Fehler beim Laden der Daten: ${error.message}`);
    }
}

// Funktion zum Aktualisieren der letzten ausgewählten Elemente
function updateLastSelectedItems(item) {
    let lastItems = JSON.parse(getCookie('lastItems') || '[]');

    // Entferne das Element, falls es bereits in der Liste ist
    lastItems = lastItems.filter(i => i.name !== item.name);
    lastItems.unshift({ name: item.name, image: item.image });

    // Halte nur die letzten 5 ausgewählten Elemente
    if (lastItems.length > 5) {
        lastItems.pop();
    }

    setCookie('lastItems', JSON.stringify(lastItems), 1); // Cookie läuft in 1 Tag ab
}

// Funktion zum Erstellen eines neuen Items
function create(input) {

    if (input) {
        // Weiterleitung zur Item-Details-Seite mit dem neuen Input
        window.location.href = `item-details.html?item=${encodeURIComponent(input)}`;
    }
}


// Aufruf zum Anzeigen der letzten ausgewählten Elemente beim Laden der Seite
window.onload = showLastSelectedItems;
