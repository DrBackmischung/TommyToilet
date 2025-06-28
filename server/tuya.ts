// server/tuya.ts
import { TuyaContext } from '@tuya/tuya-connector-nodejs';
import dotenv from 'dotenv';
import type { Connect, ViteDevServer } from 'vite';

dotenv.config();

console.log('TUYA_BASE_URL:', process.env.TUYA_BASE_URL);
console.log('TUYA_ACCESS_ID:', process.env.TUYA_ACCESS_ID);
console.log('TUYA_ACCESS_SECRET:', process.env.TUYA_ACCESS_SECRET);
console.log('TUYA_DEVICE_ID:', process.env.TUYA_DEVICE_ID);

const context = new TuyaContext({
  baseUrl: process.env.TUYA_BASE_URL!,
  accessKey: process.env.TUYA_ACCESS_ID!,
  secretKey: process.env.TUYA_ACCESS_SECRET!,
});

export function tuyaApiMiddleware(): Connect.NextHandleFunction {
  return async (req, res, next) => {
    if (req.url === '/api/device-detail') {
      try {
        const result = await context.device.detail({
          device_id: process.env.TUYA_DEVICE_ID!,
        });

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(result));
      } catch (err) {
        console.error(err);
        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'Tuya API call failed' }));
      }
    } else {
      next();
    }
  };
}
