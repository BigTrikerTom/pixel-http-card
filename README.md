# pixel-http-card v.1.0.0-Beta-2


Custom Lovelace Card zur Anzeige eines ESP32 WS2812 LED-Framebuffers über HTTP.


## Build
Voraussetzungen:
- Node.js >= 18
- npm >= 9

npm install
npm run build


## Installation in Home Assistant


- dist/pixel-http-card.js nach /config/www kopieren
- Ressource in Lovelace hinzufügen


## Beispiel


```yaml
type: custom:pixel-http-card
name: LED Bett oben
host: 192.168.22.131
poll_interval: 450
layout: grid
columns: 16