"use client";

import { useEffect, useState } from "react";

/**
 * Full-screen loading overlay with the Seren Lanka logo and a
 * creative wave + pulse animation. Renders on top of everything,
 * then fades out once the page has finished hydrating.
 *
 * Uses pure CSS keyframes – no external libs required.
 */
export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Allow the page a moment to paint, then trigger fade-out
    const timer = setTimeout(() => {
      setFadeOut(true);
      // After the fade animation completes, unmount completely
      setTimeout(() => setVisible(false), 700);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(160deg, #06133b 0%, #0b1f5c 50%, #0f2d7a 100%)",
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
        pointerEvents: fadeOut ? "none" : "auto",
      }}
    >
      {/* Animated background particles */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              borderRadius: "50%",
              background: "rgba(26, 140, 255, 0.06)",
              animation: `loadingFloat ${4 + i * 0.8}s ease-in-out infinite`,
              animationDelay: `${i * 0.4}s`,
              width: `${60 + i * 40}px`,
              height: `${60 + i * 40}px`,
              left: `${10 + i * 14}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
          />
        ))}
      </div>

      {/* Logo container with glow */}
      <div
        style={{
          position: "relative",
          animation: "loadingPulse 2s ease-in-out infinite",
        }}
      >
        {/* Glow effect behind logo */}
        <div
          style={{
            position: "absolute",
            inset: "-30px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(26, 140, 255, 0.15) 0%, transparent 70%)",
            animation: "loadingGlow 2.5s ease-in-out infinite",
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo/whitelogo.png"
          alt=""
          width={180}
          height={72}
          style={{
            position: "relative",
            width: "180px",
            height: "auto",
            objectFit: "contain",
            filter: "drop-shadow(0 0 30px rgba(26, 140, 255, 0.3))",
          }}
        />
      </div>

      {/* Wave loader */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: "4px",
          marginTop: "40px",
          height: "32px",
        }}
      >
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            style={{
              width: "4px",
              borderRadius: "2px",
              background: "linear-gradient(to top, #1a8cff, #5fb8ff)",
              animation: "loadingWave 1.2s ease-in-out infinite",
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>

      {/* Tagline text */}
      <p
        style={{
          marginTop: "24px",
          fontSize: "13px",
          fontWeight: 500,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "rgba(255, 255, 255, 0.5)",
          animation: "loadingFadeIn 1.5s ease-out forwards",
        }}
      >
        Experience Sri Lanka Your Way
      </p>

      {/* Keyframe animations */}
      <style>{`
        @keyframes loadingWave {
          0%, 100% { height: 8px; opacity: 0.4; }
          50% { height: 28px; opacity: 1; }
        }
        @keyframes loadingPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }
        @keyframes loadingGlow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.15); }
        }
        @keyframes loadingFloat {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
          50% { transform: translateY(-30px) scale(1.1); opacity: 0.6; }
        }
        @keyframes loadingFadeIn {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 0.5; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
