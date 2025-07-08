// Utility functions for map-related operations

export interface Coordinates {
  lat: number
  lng: number
}

export interface BusinessLocation {
  name: string
  address: string
  coordinates: Coordinates
  phone?: string
  website?: string
  hours?: string[]
}

// Calculate distance between two coordinates using Haversine formula
export function calculateDistance(coord1: Coordinates, coord2: Coordinates): number {
  const R = 6371 // Earth's radius in kilometers
  const dLat = toRadians(coord2.lat - coord1.lat)
  const dLng = toRadians(coord2.lng - coord1.lng)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(coord1.lat)) * Math.cos(toRadians(coord2.lat)) * Math.sin(dLng / 2) * Math.sin(dLng / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180)
}

// Format distance for display
export function formatDistance(distance: number): string {
  if (distance < 1) {
    return `${Math.round(distance * 1000)}m`
  }
  return `${distance.toFixed(1)}km`
}

// Generate Google Maps URLs
export function generateMapUrls(location: BusinessLocation) {
  const encodedAddress = encodeURIComponent(location.address)
  const encodedName = encodeURIComponent(location.name)

  return {
    view: `https://maps.google.com/?q=${encodedAddress}`,
    directions: `https://maps.google.com/maps/dir//${encodedAddress}`,
    embed: `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodedAddress}&zoom=16`,
    search: `https://maps.google.com/maps/search/${encodedName}+${encodedAddress}`,
  }
}

// Check if location is within business hours
export function isOpenNow(hours: string[]): boolean {
  const now = new Date()
  const currentDay = now.getDay() // 0 = Sunday, 1 = Monday, etc.
  const currentTime = now.getHours() * 60 + now.getMinutes()

  // This is a simplified version - in a real app, you'd parse the hours array
  // For now, assume open Monday-Friday 6AM-9PM, Saturday-Sunday 7AM-10PM
  if (currentDay >= 1 && currentDay <= 5) {
    return currentTime >= 360 && currentTime <= 1260 // 6AM to 9PM
  } else {
    return currentTime >= 420 && currentTime <= 1320 // 7AM to 10PM
  }
}

// Default coffee shop location (can be customized)
export const defaultCoffeeShopLocation: BusinessLocation = {
  name: "Nexus Café",
  address: "123 Coffee Street, Downtown District, Your City, State 12345",
  coordinates: { lat: 40.7127753, lng: -74.0059413 },
  phone: "+1 (555) 123-CAFE",
  website: "https://nexuscafe.com",
  hours: [
    "Monday: 6:00 AM - 9:00 PM",
    "Tuesday: 6:00 AM - 9:00 PM",
    "Wednesday: 6:00 AM - 9:00 PM",
    "Thursday: 6:00 AM - 9:00 PM",
    "Friday: 6:00 AM - 9:00 PM",
    "Saturday: 7:00 AM - 10:00 PM",
    "Sunday: 7:00 AM - 10:00 PM",
  ],
}
