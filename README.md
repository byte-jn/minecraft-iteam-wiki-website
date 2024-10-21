# Minecraft-Iteam-Wiki-Website
 
Dieses Projekt ist eine einfache Webanwendung, die die Minecraft API verwendet, um Minecraft-Items basierend auf der Benutzereingabe anzuzeigen. Die Anwendung besteht aus zwei Seiten: einer Hauptseite (index.html), auf der der Benutzer den Namen eines Minecraft-Items eingeben kann, und einer zweiten Seite, die das ausgewählte Item anzeigt.

# Funktionen
Nutzung der Minecraft Items API zur Anzeige von Item-Daten.
Suchfeld für Minecraft-Items auf der Startseite (index.html).
Eine Ergebnis-Seite, die die Informationen über das gesuchte Item anzeigt.

Projektstruktur
index.html: Die Startseite, auf der der Benutzer das Item eingibt, das er suchen möchte.
item.html: Die Seite, die die Ergebnisse der Item-Suche anzeigt.
style.css: CSS-Datei für das Styling der Website.
app.js: JavaScript-Datei, die die API-Abfragen und die Weiterleitung zwischen den Seiten übernimmt.

# API-Nutzung
Die Anwendung verwendet die Minecraft API, um die Item-Daten abzurufen. Die API liefert Informationen zu verschiedenen Minecraft-Items im JSON-Format. Hier ist ein Beispiel, wie ein API-Aufruf aussieht:
Code kopieren
https://minecraft-api.vercel.app/api/items?name=<item_name>
Die API gibt JSON-Daten zum gesuchten Minecraft-Item zurück. Diese Daten werden in der item.html Seite dynamisch dargestellt.

# Technologie-Stack
HTML: Für die Struktur der Webanwendung.
CSS: Für das Styling der Seiten.
JavaScript: Für die Interaktion mit der Minecraft API und die dynamische Anzeige der Ergebnisse.
Minecraft Items API: Für das Abrufen der Item-Daten.

# Vorschläge und Verbesserungen
Implementiere eine Fehlermeldung, falls das gesuchte Item nicht gefunden wird.
Füge eine Auto-Vervollständigungsfunktion hinzu, um Benutzern bei der Eingabe zu helfen.
Weitere Seiten für detailliertere Informationen zu Minecraft-Items oder eine Vergleichsfunktion.

# Lizenz
Dieses Projekt steht unter der MIT-Lizenz. Weitere Informationen findest du in der LICENSE Datei.
