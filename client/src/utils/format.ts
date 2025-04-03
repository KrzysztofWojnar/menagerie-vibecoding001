/**
 * Formats a date to a human-readable string in the format "Month DD, YYYY"
 * @param date The date to format
 * @returns A string representation of the date
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Calculates the distance between two coordinates in miles
 * @param lat1 Latitude of the first point
 * @param lon1 Longitude of the first point
 * @param lat2 Latitude of the second point
 * @param lon2 Longitude of the second point
 * @returns The distance in miles
 */
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  if (lat1 === lat2 && lon1 === lon2) {
    return 0;
  }
  
  const toRadians = (degrees: number) => degrees * Math.PI / 180;
  
  // Haversine formula
  const R = 3958.8; // Earth radius in miles
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return Math.floor(distance);
}

/**
 * Formats a user's age and name into a display string
 * @param name The user's name
 * @param age The user's age
 * @returns A formatted string with name and age
 */
export function formatNameAndAge(name: string, age: number): string {
  return `${name}, ${age}`;
}

/**
 * Truncates a string if it's longer than maxLength
 * @param str The string to truncate
 * @param maxLength The maximum length of the string
 * @returns The truncated string with ellipsis if needed
 */
export function truncateString(str: string, maxLength: number): string {
  if (!str) return '';
  if (str.length <= maxLength) return str;
  
  return str.substring(0, maxLength - 3) + '...';
}