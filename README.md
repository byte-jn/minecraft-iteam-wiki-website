# Minecraft Item Wiki Website
This project is a web application that uses the Minecraft API to display Minecraft items based on user input. The application consists of a main page (index.html), where the user can search for a Minecraft item, and a second page (item-details.html), where the details of the item are displayed.

# Features
Query Minecraft items via the Minecraft Items API.
Search field on the main page (index.html) to search for a Minecraft item.
Display item details on the item-details.html page.

# Project Structure
index.html: The main page of the application, where the user can enter the name of a Minecraft item.
item-details.html: The page that shows the details of the searched Minecraft item.
style.css: Contains the styling for the pages.
script.js: JavaScript file that handles communication with the API on the main page.
item-details.js: JavaScript file for displaying the item details on the second page.
LICENSE: Information about the project's license.
README.md: This file, which provides an overview of the project and usage information.

# API Usage
The application uses the Minecraft API to fetch information about Minecraft items. Here is an example of querying an item via the API:
https://minecraft-api.vercel.app/api/items?name=<item_name>
The API returns JSON data for the item, which is then displayed on the item-details.html page.
