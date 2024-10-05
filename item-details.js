// Function to go back to the previous page
function goBack() {
    window.history.back();
}

// Fetch item data based on query parameter
async function fetchItemData() {
    const params = new URLSearchParams(window.location.search);
    const itemName = params.get('item');

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

// Call the fetchItemData function on page load
window.onload = fetchItemData;
