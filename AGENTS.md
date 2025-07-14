# Travel Time Loading Bar Repository Guide

This repository contains a small Progressive Web App (PWA) that displays progress bars representing the elapsed portion of a journey.

## Overview
- **index.html** – main HTML file with embedded CSS and JavaScript implementing the UI and logic for managing the travel bars.
- **service-worker.js** – caches the app files to allow basic offline support.
- **manifest.json** – PWA manifest describing the app name, start URL and icon.
- **icon.png** – 192x192 icon referenced from the manifest.
- **README.md** – quick summary, setup and test instructions.
- **LICENSE** – CC0 1.0 Universal license text.
- **package.json** – dev dependencies and Jest configuration.
- **setup.sh** – verifies Node/npm versions and installs packages for testing.
- **requirements.txt** – lists required tools.

All app logic is client‑side JavaScript in `index.html`. Tests run using Jest with the jsdom environment.

## Repository Structure
```
/               – project root
├─ index.html   – webpage containing the entire app
├─ service-worker.js
├─ manifest.json
├─ icon.png
├─ README.md
├─ LICENSE
├─ package.json
├─ setup.sh
└─ requirements.txt
```

## Tips for Coding Agents
- Keep edits simple and compatible with modern browsers.
- No extra tooling or frameworks are required.
- If adding new files, update this documentation when helpful.

