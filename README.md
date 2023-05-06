# pelesdin-clip-vit

Hierbei handelt es sich um ein Webprojekt, das eine Deep Learning-Bild-Text-Vergleichsfunktion auf Basis von OpenAI's CLIP-Modell anbietet. Das Projekt verwendet das Spring Boot-Framework für das Backend und eine einfache HTML/CSS/JavaScript-Struktur für das Frontend.

## Features

- Vergleichen von zwei Texten mit einem Bild und Berechnen von Wahrscheinlichkeiten für jedes Text-Bild-Paar
- Einfache Benutzeroberfläche zum Eingeben von Texten und Bild-URLs

## Setup

1. Stellen Sie sicher, dass JDK 11 oder höher und Maven auf Ihrem System installiert sind.
2. Klonen Sie das Repository.
3. Navigieren Sie zum Stammverzeichnis des Projekts und führen Sie `mvn clean install` aus, um alle Abhängigkeiten herunterzuladen und das Projekt zu bauen.
4. Führen Sie `mvn spring-boot:run` aus, um die Anwendung zu starten.
5. Öffnen Sie Ihren Webbrowser und navigieren Sie zu `http://localhost:8080`, um die Anwendung zu verwenden.

## Anwendung verwenden

1. Geben Sie zwei Texte in die entsprechenden Textfelder ein.
2. Geben Sie die URL eines Bildes in das Bild-URL-Feld ein.
3. Klicken Sie auf "Vergleichen", um die Wahrscheinlichkeiten für jedes Text-Bild-Paar zu berechnen und anzuzeigen.
