import axios from 'axios';
import { env } from '../config/env.js';

export class GeocodeService {
  static async addressToCoords(
    address: string,
  ): Promise<{ lat: number; lng: number }> {
    const apiKey = env.GOOGLE_GEOCODING_KEY;
    const response = await axios.get(
      'https://maps.googleapis.com/maps/api/geocode/json?',
      {
        params: {
          address: address,
          key: apiKey,
        },
      },
    );

    const { lat, lng } = response.data.results[0].geometry.location;
    return { lat, lng };
  }
}
