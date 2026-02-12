"use client"

import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"

interface RotatingEarthProps {
  className?: string
}

export default function RotatingEarth({ className = "" }: RotatingEarthProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return

    const canvas = canvasRef.current
    const container = containerRef.current
    const context = canvas.getContext("2d")
    if (!context) return

    const getContainerSize = () => {
      const rect = container.getBoundingClientRect()
      return Math.min(rect.width, rect.height)
    }

    let containerSize = getContainerSize()
    let radius = containerSize / 2.5
    const dpr = window.devicePixelRatio || 1

    const setupCanvas = () => {
      containerSize = getContainerSize()
      radius = containerSize / 2.5

      canvas.width = containerSize * dpr
      canvas.height = containerSize * dpr
      canvas.style.width = `${containerSize}px`
      canvas.style.height = `${containerSize}px`
      context.setTransform(1, 0, 0, 1, 0, 0)
      context.scale(dpr, dpr)
    }

    setupCanvas()

    const projection = d3
      .geoOrthographic()
      .scale(radius)
      .translate([containerSize / 2, containerSize / 2])
      .clipAngle(90)

    const path = d3.geoPath().projection(projection).context(context)

    const pointInPolygon = (point: [number, number], polygon: number[][]): boolean => {
      const [x, y] = point
      let inside = false
      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i]
        const [xj, yj] = polygon[j]
        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
          inside = !inside
        }
      }
      return inside
    }

    const pointInFeature = (point: [number, number], feature: any): boolean => {
      const geometry = feature.geometry
      if (geometry.type === "Polygon") {
        const coordinates = geometry.coordinates
        if (!pointInPolygon(point, coordinates[0])) {
          return false
        }
        for (let i = 1; i < coordinates.length; i++) {
          if (pointInPolygon(point, coordinates[i])) {
            return false
          }
        }
        return true
      } else if (geometry.type === "MultiPolygon") {
        for (const polygon of geometry.coordinates) {
          if (pointInPolygon(point, polygon[0])) {
            let inHole = false
            for (let i = 1; i < polygon.length; i++) {
              if (pointInPolygon(point, polygon[i])) {
                inHole = true
                break
              }
            }
            if (!inHole) {
              return true
            }
          }
        }
        return false
      }
      return false
    }

    const generateDotsInPolygon = (feature: any, dotSpacing = 16) => {
      const dots: [number, number][] = []
      const bounds = d3.geoBounds(feature)
      const [[minLng, minLat], [maxLng, maxLat]] = bounds
      const stepSize = dotSpacing * 0.08

      for (let lng = minLng; lng <= maxLng; lng += stepSize) {
        for (let lat = minLat; lat <= maxLat; lat += stepSize) {
          const point: [number, number] = [lng, lat]
          if (pointInFeature(point, feature)) {
            dots.push(point)
          }
        }
      }
      return dots
    }

    interface DotData {
      lng: number
      lat: number
      visible: boolean
    }

    const allDots: DotData[] = []
    let landFeatures: any

    const render = () => {
      context.clearRect(0, 0, containerSize, containerSize)

      const currentScale = projection.scale()
      const scaleFactor = currentScale / radius

      if (landFeatures) {
        const gradient = context.createLinearGradient(0, 0, containerSize, containerSize)

        gradient.addColorStop(0, "#EE5D17") // Chart 1 - Orange
        gradient.addColorStop(0.2, "#009C89") // Chart 2 - Teal
        gradient.addColorStop(0.4, "#611FFF") // Chart 4 - Violet
        gradient.addColorStop(0.6, "#ff0000") // Chart 3 - Red
        gradient.addColorStop(0.8, "#2B4CBA") // Chart 5 - Blue
        gradient.addColorStop(0.9, "#ffffff") // White
        gradient.addColorStop(1, "#EE5D17") // Back to Orange

        const graticule = d3.geoGraticule()
        context.beginPath()
        path(graticule())
        context.strokeStyle = gradient
        context.lineWidth = 1 * scaleFactor
        context.globalAlpha = 0.25
        context.stroke()
        context.globalAlpha = 1

        context.beginPath()
        landFeatures.features.forEach((feature: any) => {
          path(feature)
        })
        context.strokeStyle = gradient
        context.lineWidth = 1 * scaleFactor
        context.stroke()

        allDots.forEach((dot) => {
          const projected = projection([dot.lng, dot.lat])
          if (
            projected &&
            projected[0] >= 0 &&
            projected[0] <= containerSize &&
            projected[1] >= 0 &&
            projected[1] <= containerSize
          ) {
            context.beginPath()
            context.arc(projected[0], projected[1], 1.2 * scaleFactor, 0, 2 * Math.PI)
            context.fillStyle = gradient
            context.globalAlpha = 0.6
            context.fill()
            context.globalAlpha = 1
          }
        })
      }
    }

    const loadWorldData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(
          "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json",
        )
        if (!response.ok) throw new Error("Failed to load land data")
        landFeatures = await response.json()

        landFeatures.features.forEach((feature: any) => {
          const dots = generateDotsInPolygon(feature, 16)
          dots.forEach(([lng, lat]) => {
            allDots.push({ lng, lat, visible: true })
          })
        })

        render()
        setIsLoading(false)
      } catch (err) {
        setError("Failed to load land map data")
        setIsLoading(false)
      }
    }

    const rotation: [number, number] = [0, 0]
    let autoRotate = true
    const rotationSpeed = 0.5

    const rotate = () => {
      if (autoRotate) {
        rotation[0] += rotationSpeed
        projection.rotate(rotation)
        render()
      }
    }

    const rotationTimer = d3.timer(rotate)

    const handleMouseDown = (event: MouseEvent) => {
      autoRotate = false
      const startX = event.clientX
      const startY = event.clientY
      const startRotation: [number, number] = [...rotation]

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const sensitivity = 0.5
        const dx = moveEvent.clientX - startX
        const dy = moveEvent.clientY - startY
        rotation[0] = startRotation[0] + dx * sensitivity
        rotation[1] = startRotation[1] - dy * sensitivity
        rotation[1] = Math.max(-90, Math.min(90, rotation[1]))
        projection.rotate(rotation)
        render()
      }

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
        setTimeout(() => {
          autoRotate = true
        }, 10)
      }

      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    const handleResize = () => {
      setupCanvas()
      radius = containerSize / 2.5
      projection.scale(radius).translate([containerSize / 2, containerSize / 2])
      render()
    }

    canvas.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("resize", handleResize)

    loadWorldData()

    return () => {
      rotationTimer.stop()
      canvas.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-card rounded-2xl p-8 ${className}`}>
        <div className="text-center">
          <p className="text-destructive font-semibold mb-2">Error loading Earth visualization</p>
          <p className="text-muted-foreground text-sm">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className={`relative aspect-square w-full ${className}`}>
      <canvas
        ref={canvasRef}
        className="rounded-full bg-transparent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  )
}
