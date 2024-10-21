# Minecraft-Iteam-Wiki-Website
 
Dieses Projekt ist eine Webanwendung, die die Minecraft API verwendet, um Minecraft-Items basierend auf Benutzereingaben anzuzeigen. Die Anwendung besteht aus einer Hauptseite (index.html), auf der der Benutzer ein Minecraft-Item suchen kann, und einer zweiten Seite (item-details.html), auf der die Details des Items dargestellt werden.

# Funktionen
Abfrage der Minecraft-Items über die Minecraft Items API.
Suchfeld auf der Hauptseite (index.html), um nach einem Minecraft-Item zu suchen.
Anzeige der Item-Details auf der Seite item-details.html.

# Projektstruktur
index.html: Die Hauptseite der Anwendung, auf der der Benutzer den Namen eines Minecraft-Items eingeben kann.
item-details.html: Die Seite, die die Details des gesuchten Minecraft-Items anzeigt.
style.css: Enthält das Styling der Seiten.
script.js: JavaScript-Datei, die die Kommunikation mit der API auf der Hauptseite steuert.
item-details.js: JavaScript-Datei für die Anzeige der Item-Details auf der zweiten Seite.
LICENSE: Informationen zur Lizenzierung des Projekts.
README.md: Diese Datei, die eine Projektübersicht und Informationen zur Nutzung gibt.

# API-Nutzung
Die Anwendung verwendet die Minecraft API, um die Informationen zu Minecraft-Items abzurufen. Hier ein Beispiel für die Abfrage eines Items über die API:
bash
Code kopieren
https://minecraft-api.vercel.app/api/items?name=<item_name>
Die API liefert JSON-Daten zum Item, die dann auf der item-details.html Seite angezeigt werden.
