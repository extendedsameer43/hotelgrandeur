"use client";

import { useEffect, useRef } from "react";
import createGlobe, { COBEOptions } from "cobe";
import { useSpring } from "framer-motion";

export function Globe({
  className,
  config = {},
}: {
  className?: string;
  config?: Partial<COBEOptions>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const rotation = useSpring(0, {
    damping: 20,
    stiffness: 50,
  });

  useEffect(() => {
    let phi = 0;
    let width = 0;

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };

    window.addEventListener("resize", onResize);
    onResize();

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 3,
      mapSamples: 16000,
      mapBrightness: 1.2,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [251 / 255, 100 / 255, 21 / 255],
      glowColor: [0.5, 0.5, 0.8],
      markers: [
        // Major hotel locations
        { location: [40.7128, -74.006], size: 0.08 }, // New York
        { location: [51.5074, -0.1278], size: 0.08 }, // London
        { location: [48.8566, 2.3522], size: 0.08 }, // Paris
        { location: [35.6762, 139.6503], size: 0.08 }, // Tokyo
        { location: [1.3521, 103.8198], size: 0.07 }, // Singapore
        { location: [25.2048, 55.2708], size: 0.07 }, // Dubai
        { location: [-33.8688, 151.2093], size: 0.07 }, // Sydney
        { location: [19.076, 72.8777], size: 0.06 }, // Mumbai
        { location: [41.9028, 12.4964], size: 0.06 }, // Rome
        { location: [52.52, 13.405], size: 0.06 }, // Berlin
        { location: [55.7558, 37.6173], size: 0.06 }, // Moscow
        { location: [22.3193, 114.1694], size: 0.06 }, // Hong Kong
        { location: [-23.5505, -46.6333], size: 0.06 }, // São Paulo
        { location: [37.7749, -122.4194], size: 0.07 }, // San Francisco
        { location: [43.6532, -79.3832], size: 0.06 }, // Toronto
      ],
      onRender: (state) => {
        if (!pointerInteracting.current) {
          phi += 0.003;
        }
        state.phi = phi + rotation.get();
        state.width = width * 2;
        state.height = width * 2;
      },
      ...config,
    });

    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1";
      }
    }, 100);

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [rotation, config]);

  return (
    <div className={className}>
      <canvas
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current =
            e.clientX - pointerInteractionMovement.current;
          if (canvasRef.current) {
            canvasRef.current.style.cursor = "grabbing";
          }
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) {
            canvasRef.current.style.cursor = "grab";
          }
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) {
            canvasRef.current.style.cursor = "grab";
          }
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta;
            rotation.set(delta / 200);
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.targetTouches[0]) {
            const delta = e.targetTouches[0].clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta;
            rotation.set(delta / 100);
          }
        }}
        style={{
          width: "100%",
          height: "100%",
          cursor: "grab",
          contain: "layout paint size",
          opacity: 0,
          transition: "opacity 1s ease",
        }}
      />
    </div>
  );
}

