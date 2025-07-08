"use client"


import React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Coffee,
  MapPin,
  Clock,
  Phone,
  Star,
  Wifi,
  Music,
  Menu,
  X,
  Play,
  Pause,
  ChevronDown,
  Navigation,
} from "lucide-react"
import Image from "next/image"

// Type definitions
interface MenuItem {
  id: number
  name: string
  price: string
  description: string
  image?: string
  popular?: boolean
  brewTime: string
}

interface MenuCategory {
  category: string
  items: MenuItem[]
}

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
  metric: string
  label: string
}

interface MousePosition {
  x: number
  y: number
}

export default function UltraModernCoffeeShop() {
  // Prevent hydration mismatch: only render floating elements on client
  const [hasMounted, setHasMounted] = React.useState(false);
  React.useEffect(() => { setHasMounted(true); }, []);
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 })
  const [isPlaying, setIsPlaying] = useState(false)
  // const [isMuted, setIsMuted] = useState(true) // Removed: video is always muted
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())

  const heroRef = useRef<HTMLElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Real menu data with actual coffee items
  const menuItems: MenuCategory[] = [
    {
      category: "Coffee",
      items: [
        {
          id: 1,
          name: "Teman tupi",
          price: "Rp 15.000",
          description: "Milkbased+espresso+gula aren.",
          image: "/Kopi Teman Tupi.jpg",
          brewTime: "-",
        },
        {
          id: 2,
          name: "tupi butterscotch",
          price: "Rp 17.000",
          description: "Milkbased+espresso+butterscotch",
          image: "/Butterscotch.jpg",
          brewTime: "-",
        },
        {
          id: 3,
          name: "tupi americano",
          price: "Rp 12.000",
          description: "Water + espresso",
          image: "/Americano.jpg",
          brewTime: "-",
        },
      ],
    },
    {
      category: "Non Coffee",
      items: [
        {
          id: 1,
          name: "Tupi taro",
          price: "Rp 18.000",
          description: "Milkbased+ taro",
          image: "/Taro.jpg",
          brewTime: "-",
        },
        {
          id: 2,
          name: "tupi redvelvet",
          price: "Rp 18.000",
          description: "Milkbased+redvelvet",
          image: "/Red Velvet.jpg ",
          brewTime: "-",
        },
        {
          id: 3,
          name: "tupi matcha",
          price: "20.000  ",
          description: "Milkbased+redvelvet",
          image: "/Matcha.jpg ",
          brewTime: "-",
        },
      ],
    },
  ]

  const features: Feature[] = [
    {
      icon: <Coffee className="w-6 h-6" />,
      title: "Expert Baristas",
      description: "Skilled coffee artisans craft each cup to perfection",
      metric: "15+",
      label: "Years Experience",
    },
    {
      icon: <Wifi className="w-6 h-6" />,
      title: "Free High-Speed WiFi",
      description: "Stay connected with complimentary internet access",
      metric: "100MB/s",
      label: "Speed",
    },
    {
      icon: <Music className="w-6 h-6" />,
      title: "Ambient Atmosphere",
      description: "Carefully curated music and lighting for the perfect ambiance",
      metric: "All Day",
      label: "Comfort",
    },
  ]

  // Optimized scroll handler
  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY)
  }, [])

  // Optimized mouse move handler
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }, [])

  // Setup intersection observer
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.1 },
    )

    const sections = document.querySelectorAll("section[id]")
    sections.forEach((section) => {
      if (observerRef.current) {
        observerRef.current.observe(section)
      }
    })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  // Setup event listeners
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("mousemove", handleMouseMove, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [handleScroll, handleMouseMove])

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev)
  }, [])

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  const togglePlaying = useCallback(() => {
    setIsPlaying((prev) => !prev)
  }, [])

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const navHeight = 80 // Account for fixed navigation height
      const elementPosition = element.offsetTop - navHeight
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      })
    }
  }, [])

  // Generate floating element randoms only once per mount to avoid hydration mismatch
  const floatingElements = React.useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const elements = [
        <Coffee key={`coffee-${i}`} className="w-2 h-2 text-[#E4DBD2]/20" />, 
        <div key={`steam-${i}`} className="w-1 h-4 bg-[#E4DBD2]/10 rounded-full" />, 
        <div key={`bean-${i}`} className="w-3 h-2 bg-[#E4DBD2]/15 rounded-full" />,
      ];
      const element = elements[i % 3];
      // Generate randoms ONCE per element
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const duration = 3 + Math.random() * 4;
      const delay = Math.random() * 3;
      return {
        key: i,
        element,
        style: {
          left: `${left}%`,
          top: `${top}%`,
          animation: `coffee-float ${duration}s ease-in-out infinite`,
          animationDelay: `${delay}s`,
        },
      };
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D424B] via-[#0D424B]/90 to-[#0D424B] text-[#E4DBD2] overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0D424B] via-[#0D424B]/80 to-[#0D424B]/90" />
        {/* Coffee-themed floating elements (client-only to avoid hydration mismatch) */}
        {hasMounted && floatingElements.map(({ key, element, style }) => (
          <div key={key} className="absolute opacity-20" style={style}>
            {element}
          </div>
        ))}
      </div>

      {/* Cursor Follower */}
      <div
        className="fixed w-3 h-3 bg-[#E4DBD2] rounded-full pointer-events-none z-50 transition-transform duration-100 mix-blend-difference"
        style={{
          left: mousePosition.x - 6,
          top: mousePosition.y - 6,
          transform: "scale(1)",
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-[#0D424B]/80 backdrop-blur-xl z-40 border-b border-[#E4DBD2]/10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button onClick={() => scrollToSection("home")} className="flex items-center space-x-2">
              <Image src="/Logo Kopi Tupi.png" alt="Kopi Tupi Logo" width={40} height={40} />
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#E4DBD2] to-[#E4DBD2]/80 bg-clip-text text-transparent">
                KOPI TUPI
              </span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {[
                { name: "Home", href: "home" },
                { name: "Menu", href: "menu" },
                { name: "Experience", href: "experience" },
                { name: "Contact", href: "contact" },
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="relative text-[#E4DBD2] hover:text-[#E4DBD2]/70 transition-colors font-medium group text-sm"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </div>

            {/* Mobile Menu */}
            <button
              className="md:hidden p-2 hover:bg-white/10 rounded-full transition-colors"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-3 pb-3 border-t border-white/10 animate-slide-down">
              <div className="flex flex-col space-y-3 mt-3">
                {[
                  { name: "Home", href: "home" },
                  { name: "Menu", href: "menu" },
                  { name: "Experience", href: "experience" },
                  { name: "Contact", href: "contact" },
                ].map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      scrollToSection(item.href)
                      closeMenu()
                    }}
                    className="text-white hover:text-gray-300 transition-colors font-medium text-sm text-left"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-28">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#0D424B]/60 to-transparent z-10"
            style={{
              transform: `translateY(${scrollY * 0.5}px)`,
            }}
          />
          {/* PLACEHOLDER: Replace with actual coffee shop interior image */}
          <Image
            src="/Background.png?width=1920"
            alt="Modern coffee shop interior with comfortable seating and warm lighting"
            fill
            className="object-cover"
            style={{
              transform: `translateY(${scrollY * 0.3}px) scale(${1 + scrollY * 0.0002})`,
              filter: "grayscale(100%)",
            }}
            priority
          />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10 pb-16 md:pb-20">
          <div className="space-y-6 animate-fade-in-up mb-16 md:mb-20">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="block bg-gradient-to-r from-[#E4DBD2] via-[#E4DBD2]/90 to-[#E4DBD2] bg-clip-text text-transparent">
                WELCOME TO
              </span>
              <span className="block text-[#E4DBD2]">KOPI TUPI</span>
            </h1>

            <p className="text-base md:text-lg lg:text-xl text-[#E4DBD2]/80 max-w-2xl mx-auto leading-relaxed">
              Where exceptional coffee meets modern comfort. Experience artisanal brewing in a contemporary atmosphere
              designed for connection and creativity.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-[#E4DBD2] text-[#0D424B] hover:bg-[#E4DBD2]/90 px-6 md:px-8 py-2 md:py-3 text-sm md:text-base font-semibold transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
                onClick={() => scrollToSection("menu")}
              >
                <span className="flex items-center space-x-2">
                  <span>Explore Menu</span>
                  <Coffee className="w-4 h-4" />
                </span>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-[#E4DBD2] text-[#E4DBD2] hover:bg-[#E4DBD2] hover:text-[#0D424B] px-6 md:px-8 py-2 md:py-3 text-sm md:text-base font-semibold transform hover:scale-105 transition-all duration-300 bg-transparent backdrop-blur-sm"
                onClick={() => scrollToSection("experience")}
              >
                <span className="flex items-center space-x-2">
                  <Play className="w-4 h-4" />
                  <span>Virtual Tour</span>
                </span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Menu Section */}
      <section id="menu" className="py-12 md:py-16 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-12">
            <h2
              className={`text-2xl md:text-4xl lg:text-5xl font-bold text-[#E4DBD2] mb-4 transition-all duration-1000 ${
                visibleSections.has("menu") ? "animate-fade-in-up" : "opacity-0 translate-y-10"
              }`}
            >
              OUR MENU
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-[#E4DBD2]/70 max-w-2xl mx-auto">
              Discover our carefully curated selection of premium coffees, each crafted with passion and precision by
              our expert baristas.
            </p>
          </div>

          <div className="space-y-10 md:space-y-12">
            {menuItems.map((category, categoryIndex) => (
              <div key={category.category} className="space-y-6">
                <h3 className="text-xl md:text-2xl font-bold text-center text-white mb-6">{category.category}</h3>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {category.items.map((item, itemIndex) => (
                    <Card
                      key={item.id}
                      className="group bg-[#E4DBD2]/5 backdrop-blur-xl border border-[#E4DBD2]/10 hover:border-[#E4DBD2]/30 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 cursor-pointer overflow-hidden relative"
                      style={{
                        animationDelay: `${itemIndex * 0.2}s`,
                        minHeight: '320px',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                      }}
                    >
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover absolute inset-0 w-full h-full z-0"
                          style={{ filter: 'brightness(0.7)' }}
                        />
                      )}
                      <div className="relative z-10 p-4 flex flex-col h-full justify-end">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-base md:text-lg font-bold text-[#E4DBD2] drop-shadow-lg">
                            {item.name}
                          </h4>
                          <Badge variant="secondary" className="bg-white text-black font-bold text-xs">
                            {item.price}
                          </Badge>
                        </div>
                        <p className="text-[#E4DBD2]/90 text-xs md:text-sm leading-relaxed drop-shadow-lg mb-4">{item.description}</p>
                        <Button disabled className="w-full bg-[#E4DBD2] text-[#0D424B] text-xs md:text-sm py-2 cursor-not-allowed opacity-70">
                          Read More
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-12 md:py-16 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-12">
            <h2
              className={`text-2xl md:text-4xl lg:text-5xl font-bold text-[#E4DBD2] mb-4 transition-all duration-1000 ${
                visibleSections.has("experience") ? "animate-fade-in-up" : "opacity-0 translate-y-10"
              }`}
            >
              THE Kopi tupi EXPERIENCE
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-[#E4DBD2]/70 max-w-2xl mx-auto">
              More than just coffee - we create an environment where community, comfort, and exceptional quality come
              together.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-10 md:mb-12">
            {features.map((feature, index) => (
              <Card
                key={feature.title}
                className="group bg-[#E4DBD2]/5 backdrop-blur-xl border border-[#E4DBD2]/10 hover:border-[#E4DBD2]/30 transition-all duration-500 transform hover:-translate-y-3 text-center overflow-hidden"
                style={{ animationDelay: `${index * 0.3}s` }}
              >
                <CardContent className="p-4 md:p-6 space-y-4">
                  <div className="relative">
                    <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-[#E4DBD2]/10 rounded-full mb-3 group-hover:bg-[#E4DBD2]/20 transition-all duration-300">
                      <div className="text-[#E4DBD2] group-hover:scale-110 transition-transform duration-300">
                        {feature.icon}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg md:text-xl font-bold text-[#E4DBD2] mb-2">{feature.title}</h3>
                  <p className="text-[#E4DBD2]/60 leading-relaxed text-xs md:text-sm">{feature.description}</p>

                  <div className="space-y-1">
                    <div className="text-2xl md:text-3xl font-bold text-[#E4DBD2]">{feature.metric}</div>
                    <div className="text-xs text-[#E4DBD2]/50 uppercase tracking-wider">{feature.label}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Interactive Demo */}
          <div className="bg-[#E4DBD2]/5 backdrop-blur-xl rounded-2xl p-4 md:p-6 border border-[#E4DBD2]/10">
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold text-[#E4DBD2]">Immersive Atmosphere</h3>
                <p className="text-sm md:text-base text-[#E4DBD2]/70 leading-relaxed">
                  Step into our thoughtfully designed space where every detail contributes to your perfect coffee
                  experience. From comfortable seating to ambient lighting, we've created an environment that inspires
                  and energizes.
                </p>

                <div className="space-y-3">
                  {[
                    "Comfortable seating areas for work and relaxation",
                    "Natural lighting and warm interior design",
                    "Quiet zones for focused work sessions",
                    "Community tables for social connections",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-[#E4DBD2] rounded-full" />
                      <span className="text-[#E4DBD2]/80 text-xs md:text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className="bg-[#E4DBD2] text-[#0D424B] hover:bg-[#E4DBD2]/90 px-4 md:px-6 py-2 font-semibold transform hover:scale-105 transition-all duration-300 text-xs md:text-sm"
                  onClick={togglePlaying}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 mr-2" />
                      Pause Tour
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Start Virtual Tour
                    </>
                  )}
                </Button>
                {/* Mute/unmute button removed as requested. Video will always be muted. */}
              </div>

              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-[#0D424B]/20 to-[#0D424B]/40 rounded-xl overflow-hidden border border-[#E4DBD2]/20 flex items-center justify-center">
                  {isPlaying ? (
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/Nu8kIIL-CDA?si=fw8aA5lrPlifHSnv&autoplay=1&loop=1&playlist=Nu8kIIL-CDA&controls=0&modestbranding=1&showinfo=0&rel=0&mute=1"
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      className="w-full h-full"
                      id="kopi-tupi-virtual-tour"
                      style={{ background: '#0D424B' }}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-10">
                      <Play className="w-20 h-20 text-[#E4DBD2]/80" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 md:py-16 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-12">
            <h2
              className={`text-2xl md:text-4xl lg:text-5xl font-bold text-[#E4DBD2] mb-4 transition-all duration-1000 ${
                visibleSections.has("contact") ? "animate-fade-in-up" : "opacity-0 translate-y-10"
              }`}
            >
              VISIT US TODAY
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-[#E4DBD2]/70 max-w-2xl mx-auto">
              Find us in the heart of the city, where great coffee and community come together. We look forward to
              serving you.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[
              {
                icon: <MapPin className="w-6 h-6" />,
                title: "Location",
                content: [
                  "Kopi Tupi",
                  "8C59+7FQ, Jl. Kaliurang, Tj. Manding, Umbulmartani",
                  "Ngemplak, Sleman, Yogyakarta 55584, Indonesia",
                ],
              },
              {
                icon: <Clock className="w-6 h-6" />,
                title: "Hours",
                content: ["Saturday - Friday: 18:00 PM - 00:00 PM"],
              },
              {
                icon: <Phone className="w-6 h-6" />,
                title: "Contact",
                content: ["+62 878 5104 0868", "kopitupi.id@gmail.com"],
              },
            ].map((item, index) => (
              <Card
                key={item.title}
                className="group bg-[#E4DBD2]/5 backdrop-blur-xl border border-[#E4DBD2]/10 hover:border-[#E4DBD2]/30 transition-all duration-500 transform hover:-translate-y-3 text-center"
              >
                <CardContent className="p-4 md:p-6 space-y-3">
                  <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-[#E4DBD2]/10 rounded-full mb-3 group-hover:bg-[#E4DBD2]/20 transition-colors">
                    <div className="text-[#E4DBD2] group-hover:scale-110 transition-transform">{item.icon}</div>
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-[#E4DBD2] mb-2">{item.title}</h3>
                  <div className="text-[#E4DBD2]/60 space-y-1">
                    {item.content.map((line, i) => (
                      <p key={i} className="text-xs md:text-sm">
                        {line}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Interactive Map */}
          <div className="mt-10 md:mt-12 mb-8">
            <div className="bg-[#E4DBD2]/5 backdrop-blur-xl rounded-2xl p-4 md:p-6 border border-[#E4DBD2]/10 overflow-hidden">
              <h3 className="text-xl md:text-2xl font-bold text-[#E4DBD2] mb-4 text-center">Find Us Here</h3>
              <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden">
                {/* Google Maps Embed for Kopi Tupi */}
                <iframe
                  src="https://www.google.com/maps?q=kopi+tupi,+8C59%2B7FQ,+Jl.+Kaliurang,+Tj.+Manding,+Umbulmartani,+Kec.+Ngemplak,+Kabupaten+Sleman,+Daerah+Istimewa+Yogyakarta+55584&output=embed&hl=en"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Kopi Tupi Location"
                  className="rounded-xl"
                />
              </div>
              <div className="flex flex-wrap gap-2 mt-4 justify-center">
                <Button
                  size="lg"
                  className="bg-[#E4DBD2] text-[#0D424B] hover:bg-[#E4DBD2]/90 px-6 md:px-8 py-2 md:py-3 text-sm md:text-base font-semibold transform hover:scale-110 transition-all duration-300 hover:shadow-2xl"
                  onClick={() => window.open('https://www.google.com/maps/dir/?api=1&destination=kopi+tupi,+8C59%2B7FQ,+Jl.+Kaliurang,+Tj.+Manding,+Umbulmartani,+Kec.+Ngemplak,+Kabupaten+Sleman,+Daerah+Istimewa+Yogyakarta+55584', '_blank')}
                >
                  Get Directions
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#E4DBD2]/5 backdrop-blur-xl border-t border-[#E4DBD2]/10 py-6 md:py-8">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-3">
              <button onClick={() => scrollToSection("home")} className="flex items-center space-x-2">
                <Image src="/Logo Kopi Tupi.png" alt="Kopi Tupi Logo" width={32} height={32} />
                <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-[#E4DBD2] to-[#E4DBD2]/70 bg-clip-text text-transparent">
                  KOPI TUPI
                </span>
              </button>
              <p className="text-[#E4DBD2]/60 leading-relaxed text-xs md:text-sm">
                Crafting exceptional coffee experiences in the heart of the city. Where quality meets community.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm md:text-base font-semibold text-[#E4DBD2]">Quick Links</h4>
              <div className="space-y-2">
                {[
                  { name: "Menu", href: "menu" },
                  { name: "Experience", href: "experience" },
                  { name: "Contact", href: "contact" },
                  { name: "Catering Services", href: "#" },
                ].map((link) => (
                  <button
                    key={link.name}
                    onClick={() => link.href !== "#" && scrollToSection(link.href)}
                    className="block text-[#E4DBD2]/60 hover:text-[#E4DBD2] transition-colors text-xs md:text-sm text-left"
                  >
                    {link.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm md:text-base font-semibold text-[#E4DBD2]">Connect With Us</h4>
              <p className="text-[#E4DBD2]/60 text-xs md:text-sm">Follow us for updates and special offers!</p>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#E4DBD2]/60 hover:text-[#E4DBD2] hover:bg-[#E4DBD2]/10 text-xs"
                >
                  Instagram
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#E4DBD2]/60 hover:text-[#E4DBD2] hover:bg-[#E4DBD2]/10 text-xs"
                >
                  Facebook
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-[#E4DBD2]/10 mt-6 pt-6 text-center">
            <p className="text-[#E4DBD2]/50 text-xs md:text-sm">
              &copy; {new Date().getFullYear()} kopi tupi. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Action Button */}
      <button
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 w-10 h-10 md:w-12 md:h-12 bg-[#E4DBD2] text-[#0D424B] rounded-full shadow-2xl hover:scale-110 transition-all duration-300 z-40 flex items-center justify-center"
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <ChevronDown className="w-4 h-4 md:w-5 md:h-5 rotate-180" />
      </button>
    </div>
  )
}
