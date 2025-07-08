"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Coffee, MapPin, Clock, Star, Navigation, Phone, Wifi } from "lucide-react"

interface MapProps {
  address?: string
  businessName?: string
  coordinates?: {
    lat: number
    lng: number
  }
}

export function InteractiveMap({
  address = "123 Coffee Street, Downtown District, Your City, State 12345",
  businessName = "Nexus Café",
  coordinates = { lat: 40.7127753, lng: -74.0059413 },
}: MapProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [mapError, setMapError] = useState(false)

  // Generate Google Maps embed URL
  const embedUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(address)}&zoom=16&maptype=roadmap`

  // Fallback embed URL (works without API key but with limitations)
  const fallbackEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.1234567890123!2d${coordinates.lng}!3d${coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${encodeURIComponent(businessName)}!5e0!3m2!1sen!2sus!4v${Date.now()}!5m2!1sen!2sus`

  const handleMapLoad = () => {
    setIsLoaded(true)
  }

  const handleMapError = () => {
    setMapError(true)
  }

  const openInGoogleMaps = () => {
    window.open(`https://maps.google.com/?q=${encodeURIComponent(address)}`, "_blank")
  }

  const getDirections = () => {
    window.open(`https://maps.google.com/maps/dir//${encodeURIComponent(address)}`, "_blank")
  }

  const callBusiness = () => {
    window.open("tel:+15551234CAFE")
  }

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 md:p-6 border border-white/10 overflow-hidden">
      <h3 className="text-xl md:text-2xl font-bold text-white mb-4 text-center">Find Us Here</h3>

      <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden group">
        {!mapError ? (
          <>
            <iframe
              src={fallbackEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${businessName} Location`}
              className="rounded-xl transition-opacity duration-300"
              onLoad={handleMapLoad}
              onError={handleMapError}
            />

            {/* Custom overlay with business info */}
            <div className="absolute top-4 left-4 bg-black/90 backdrop-blur-sm rounded-lg p-3 text-white max-w-xs transform transition-all duration-300 group-hover:scale-105">
              <div className="flex items-center space-x-2 mb-2">
                <Coffee className="w-5 h-5 text-amber-400" />
                <span className="font-bold text-sm">{businessName}</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed mb-2">
                Premium coffee in the heart of downtown. Open daily with free WiFi and comfortable seating.
              </p>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span className="text-green-400 font-medium">Open Now</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>4.8/5</span>
                </span>
              </div>
            </div>

            {/* Loading overlay */}
            {!isLoaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 to-amber-700/20 flex items-center justify-center rounded-xl">
                <div className="text-center space-y-2">
                  <div className="w-8 h-8 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-white/70 text-sm">Loading Map...</p>
                </div>
              </div>
            )}
          </>
        ) : (
          // Fallback when map fails to load
          <div className="w-full h-full bg-gradient-to-br from-amber-900/20 to-amber-700/20 rounded-xl flex items-center justify-center">
            <div className="text-center space-y-4 p-6">
              <MapPin className="w-12 h-12 text-amber-400 mx-auto" />
              <div className="space-y-2">
                <h4 className="text-white font-bold">Visit Us At:</h4>
                <p className="text-gray-300 text-sm leading-relaxed">{address}</p>
              </div>
              <Button onClick={openInGoogleMaps} className="bg-amber-500 hover:bg-amber-600 text-black font-semibold">
                Open in Maps
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Map action buttons */}
      <div className="flex flex-wrap gap-2 mt-4 justify-center">
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-400 hover:text-white hover:bg-white/10 text-xs transition-all duration-300 hover:scale-105"
          onClick={openInGoogleMaps}
        >
          <MapPin className="w-3 h-3 mr-1" />
          View in Google Maps
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-400 hover:text-white hover:bg-white/10 text-xs transition-all duration-300 hover:scale-105"
          onClick={getDirections}
        >
          <Navigation className="w-3 h-3 mr-1" />
          Get Directions
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-400 hover:text-white hover:bg-white/10 text-xs transition-all duration-300 hover:scale-105"
          onClick={callBusiness}
        >
          <Phone className="w-3 h-3 mr-1" />
          Call Now
        </Button>
      </div>

      {/* Additional location info */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="space-y-1">
            <Wifi className="w-4 h-4 text-amber-400 mx-auto" />
            <p className="text-xs text-gray-400">Free WiFi</p>
          </div>
          <div className="space-y-1">
            <Coffee className="w-4 h-4 text-amber-400 mx-auto" />
            <p className="text-xs text-gray-400">Fresh Coffee</p>
          </div>
          <div className="space-y-1">
            <Clock className="w-4 h-4 text-amber-400 mx-auto" />
            <p className="text-xs text-gray-400">Open Daily</p>
          </div>
          <div className="space-y-1">
            <MapPin className="w-4 h-4 text-amber-400 mx-auto" />
            <p className="text-xs text-gray-400">Downtown</p>
          </div>
        </div>
      </div>
    </div>
  )
}
