import axios from 'axios';
import { env } from '../config/env.js';

export class GeocodeService {
  static async addressToCoords(
    address: string,
  ): Promise<{ lat: number; lng: number }> {
    const apiKey = env.GEOCODING_API_KEY;
    const response = await axios.get(
      'https://api.opencagedata.com/geocode/v1/json',
      {
        params: {
          q: address,
          key: apiKey,
        },
      },
    );

    const { lat, lng } = response.data.results[0].geometry;
    return { lat, lng };
  }
}
