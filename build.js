const fs = require('fs');
const path = require('path');
require('dotenv').config();

const config = {
  TUYA_ACCESS_ID: process.env.TUYA_ACCESS_ID || '',
  TUYA_ACCESS_SECRET: process.env.TUYA_ACCESS_SECRET || '',
  TUYA_DEVICE_ID: process.env.TUYA_DEVICE_ID || '',
  TUYA_BASE_URL: process.env.TUYA_BASE_URL || 'https://openapi.tuyaeu.com'
};

let output = '';
for (const [key, value] of Object.entries(config)) {
  output += `window.${key} = ${JSON.stringify(value)};\n`;
}

fs.writeFileSync(path.join(__dirname, 'public', 'config.js'), output);
console.log('Generated public/config.js');
