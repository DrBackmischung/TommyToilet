# TommyToilet

A small React app that checks whether my cat Tommy used his Tuya smart toilet today. The UI calls the Tuya API directly from the browser.

## Setup

1. Copy `.env.example` to `.env` and fill in your `TUYA_ACCESS_ID`, `TUYA_ACCESS_SECRET`, `TUYA_DEVICE_ID` and optional `TUYA_BASE_URL`.
2. Install dependencies and build the project:

```bash
npm install
npm run build
```

3. Open `public/index.html` in your browser or serve the `public` directory with any static web server.

**Note:** The Tuya credentials end up in `public/config.js` and are therefore visible in the browser.
