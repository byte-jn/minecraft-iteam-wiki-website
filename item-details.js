// Function to check if cookies are enabled
function areCookiesEnabled() {
    document.cookie = "testcookie=1";
    const cookiesEnabled = document.cookie.indexOf("testcookie") !== -1;

    // Directly expire the test cookie by setting an expiration in the past
    document.cookie = "testcookie=1; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";

    return cookiesEnabled;
}

// Function to set a cookie
function setCookie(name, value, days) {
    if (!areCookiesEnabled()) {
        console.warn("Cookies are not enabled in this browser.");
        return;
    }
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
    console.log(`Cookie set: ${name}=${value}, expires in ${days} days`);
}

// Function to get a cookie
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        const cookieValue = decodeURIComponent(parts.pop().split(';').shift());
        console.log(`Cookie read: ${name}=${cookieValue}`);
        return cookieValue;
    }
    console.warn(`Cookie not found: ${name}`);
    return null; // Return null if cookie not found
}

// Function to delete a cookie
function deleteCookie(name) {
    setCookie(name, '', -1); // Set the expiration date in the past
    console.log(`Cookie deleted: ${name}`);
}

// Fetch item data based on query parameter
async function fetchItemData() {
    const params = new URLSearchParams(window.location.search);
    const itemName2 = params.get('item');

    itemName = itemName2.replace(/%20/g, ' ');

    if (!itemName) {
        document.getElementById('item-details').innerHTML = "<p>No item specified.</p>";
        return;
    }

    try {
        const response = await fetch('https://minecraft-api.vercel.app/api/items');
        const items = await response.json();

        // Find the item that matches the input
        const item = items.find(i => i.name.toLowerCase() === itemName.toLowerCase());

        if (item) {
            displayItemDetails(item);
            updateLastSelectedItems(item); // Call to update cookies
        } else {
            document.getElementById('item-details').innerHTML = `<p>Item "${itemName}" not found.</p>`;
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        document.getElementById('item-details').innerHTML = "<p>Error fetching item data.</p>";
    }
}

// Function to display item details
function displayItemDetails(item) {
    const itemDetailsDiv = document.getElementById('item-details');
    itemDetailsDiv.innerHTML = `
        <h2>${item.name}</h2>
        <img src="${item.image}" alt="${item.name}">
        <p><strong>Description:</strong> ${item.description}</p>
        <p><strong>Stack Size:</strong> ${item.stackSize}</p>
        <p><strong>Renewable:</strong> ${item.renewable ? 'Yes' : 'No'}</p>
    `;
}

// Function to update last selected items in cookies
function updateLastSelectedItems(item) {
    try {
        let lastItems = JSON.parse(getCookie('lastItems') || '[]');

        // Remove the item if it's already in the list
        lastItems = lastItems.filter(i => i.name !== item.name);
        // Add the new item at the beginning
        lastItems.unshift({ name: item.name, image: item.image });

        // Keep only the last 5 selected items
        if (lastItems.length > 5) {
            lastItems.pop();
        }

        // Set the updated list in the cookie
        setCookie('lastItems', JSON.stringify(lastItems), 1); // Cookie expires in 1 day
        console.log("Updated last selected items:", lastItems);
    } catch (error) {
        console.error("Error updating last selected items:", error);
    }
}

// Call the fetchItemData function on page load
window.onload = fetchItemData;
