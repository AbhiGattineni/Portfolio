/**
 * Geolocation utility - Get user location from IP address
 * Uses free IP geolocation API (ip-api.com)
 */

/**
 * Get location information from IP address
 * @param {string} ip - IP address
 * @returns {Promise<object>} Location data
 */
export async function getLocationFromIP(ip) {
  // Skip localhost/private IPs
  if (!ip || ip === '::1' || ip === '127.0.0.1' || ip.startsWith('192.168.') || ip.startsWith('10.') || ip.startsWith('172.')) {
    return {
      country: 'Local',
      region: 'Development',
      city: 'Localhost',
      lat: null,
      lon: null,
      timezone: null,
      isp: null
    };
  }

  // Handle multiple IPs (from x-forwarded-for header)
  const cleanIP = ip.split(',')[0].trim();

  try {
    // Using ip-api.com (free tier: 45 requests/minute)
    const response = await fetch(`http://ip-api.com/json/${cleanIP}?fields=status,message,country,regionName,city,lat,lon,timezone,isp`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`IP API returned ${response.status}`);
    }

    const data = await response.json();

    if (data.status === 'fail') {
      console.error('IP geolocation failed:', data.message);
      return {
        country: 'Unknown',
        region: 'Unknown',
        city: 'Unknown',
        lat: null,
        lon: null,
        timezone: null,
        isp: null,
        error: data.message
      };
    }

    return {
      country: data.country || 'Unknown',
      region: data.regionName || 'Unknown',
      city: data.city || 'Unknown',
      lat: data.lat || null,
      lon: data.lon || null,
      timezone: data.timezone || null,
      isp: data.isp || null,
      locationString: `${data.city || ''}, ${data.regionName || ''}, ${data.country || ''}`.replace(/^,\s*|,\s*$/g, '').trim()
    };
  } catch (error) {
    console.error('Error fetching location from IP:', error);
    return {
      country: 'Unknown',
      region: 'Unknown',
      city: 'Unknown',
      lat: null,
      lon: null,
      timezone: null,
      isp: null,
      error: error.message
    };
  }
}

/**
 * Get location asynchronously (non-blocking)
 * Returns a promise that resolves with location data
 */
export async function getLocationAsync(ip) {
  return getLocationFromIP(ip);
}

export default {
  getLocationFromIP,
  getLocationAsync
};

