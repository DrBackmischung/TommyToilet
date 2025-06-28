import { VercelRequest, VercelResponse } from '@vercel/node';
import { TuyaContext } from '@tuya/tuya-connector-nodejs';
import dotenv from 'dotenv';

dotenv.config();

const context = new TuyaContext({
  baseUrl: process.env.TUYA_BASE_URL!,
  accessKey: process.env.TUYA_ACCESS_ID!,
  secretKey: process.env.TUYA_ACCESS_SECRET!,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const deviceId = process.env.TUYA_DEVICE_ID!;
  try {
    const result = await context.device.detail({ device_id: deviceId });
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Tuya API call failed (device detail)' });
  }
}
