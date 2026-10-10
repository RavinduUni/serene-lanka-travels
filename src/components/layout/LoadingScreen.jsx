"use client";

import { useEffect, useState } from "react";
import { Plane, MapPin, Cloud } from "lucide-react";

/**
 * Full-screen loading overlay based on the provided mockup.
 * Features a white background, a plane flying along a dotted path,
 * and elegant typography. Fades out once the page has finished hydrating.
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
    }, 1500); // slightly longer to appreciate the animation
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
        backgroundColor: "#ffffff",
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
        pointerEvents: fadeOut ? "none" : "auto",
        fontFamily: 'var(--font-sans)',
      }}
    >
      {/* Graphic Area (Plane, Clouds, Path) */}
      <div style={{ position: "relative", width: "100%", maxWidth: "600px", height: "250px", marginBottom: "40px" }}>
        
        {/* Dotted path SVG */}
        <svg 
          style={{ position: "absolute", top: "50%", left: "10%", width: "80%", height: "100px", transform: "translateY(-50%)", overflow: "visible" }} 
          viewBox="0 0 100 20" 
          preserveAspectRatio="none"
        >
          <path 
            d="M 0,15 Q 50,25 100,5" 
            fill="none" 
            stroke="#94a3b8" 
            strokeWidth="0.5" 
            strokeDasharray="1.5, 1.5" 
          />
        </svg>

        {/* Start Pin (Left/Blue) */}
        <div style={{ position: "absolute", left: "10%", top: "72%", transform: "translate(-50%, -100%)", color: "#0b1f5c" }}>
          <MapPin size={24} strokeWidth={2.5} fill="#ffffff" />
          <div style={{ position: "absolute", top: "6px", left: "6px", width: "12px", height: "12px", backgroundColor: "#0b1f5c", borderRadius: "50%" }} />
        </div>

        {/* End Pin (Right/Red) */}
        <div style={{ position: "absolute", right: "10%", top: "25%", transform: "translate(50%, -100%)", color: "#991b1b" }}>
          <MapPin size={24} strokeWidth={2.5} fill="#ffffff" />
          <div style={{ position: "absolute", top: "6px", left: "6px", width: "12px", height: "12px", backgroundColor: "#991b1b", borderRadius: "50%" }} />
        </div>

        {/* Clouds (Lucide icons with soft opacity) */}
        <div style={{ position: "absolute", left: "20%", top: "65%", color: "#cbd5e1", opacity: 0.6, animation: "loadingCloudFloat 3s ease-in-out infinite alternate" }}>
          <Cloud size={48} fill="currentColor" stroke="none" />
        </div>
        <div style={{ position: "absolute", right: "18%", top: "60%", color: "#cbd5e1", opacity: 0.5, animation: "loadingCloudFloat 4s ease-in-out infinite alternate-reverse" }}>
          <Cloud size={56} fill="currentColor" stroke="none" />
        </div>
        <div style={{ position: "absolute", left: "35%", top: "20%", color: "#e2e8f0", opacity: 0.4, animation: "loadingCloudFloat 3.5s ease-in-out infinite alternate" }}>
          <Cloud size={40} fill="currentColor" stroke="none" />
        </div>

        {/* Airplane */}
        <div 
          style={{ 
            position: "absolute", 
            left: "50%", 
            top: "50%", 
            transform: "translate(-50%, -50%) rotate(15deg)", 
            color: "#0b1f5c",
            animation: "loadingPlaneBob 2s ease-in-out infinite" 
          }}
        >
          {/* We use a stylized SVG for the plane to look closer to a real airliner silhouette */}
          <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
             <path d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2C10.67 2 10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z"/>
          </svg>
          {/* Subtle trail shadow behind the plane */}
          <div style={{ position: "absolute", top: "50%", right: "80%", width: "40px", height: "4px", background: "linear-gradient(to right, transparent, rgba(148, 163, 184, 0.2))", transform: "translateY(-50%)", borderRadius: "2px" }} />
        </div>
      </div>

      {/* Typography */}
      <h1 
        style={{ 
          fontFamily: 'var(--font-serif)', 
          fontSize: "1.75rem", 
          fontWeight: 600, 
          letterSpacing: "0.25em", 
          color: "#0b1f5c", 
          margin: 0,
          textTransform: "uppercase",
          textAlign: "center"
        }}
      >
        Seren Lanka Travels
      </h1>
      
      <p 
        style={{ 
          marginTop: "12px", 
          fontSize: "0.95rem", 
          color: "#64748b", 
          letterSpacing: "0.05em",
          fontWeight: 400
        }}
      >
        Loading your journey...
      </p>

      {/* Loading Progress Bar */}
      <div 
        style={{ 
          marginTop: "24px", 
          width: "200px", 
          height: "2px", 
          backgroundColor: "#e2e8f0", 
          position: "relative",
          overflow: "hidden"
        }}
      >
        <div 
          style={{ 
            position: "absolute", 
            top: 0, 
            left: 0, 
            height: "100%", 
            backgroundColor: "#0b1f5c",
            animation: "loadingBarFill 1.5s ease-out forwards"
          }} 
        />
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes loadingPlaneBob {
          0%, 100% { transform: translate(-50%, -50%) rotate(15deg) translateY(0); }
          50% { transform: translate(-50%, -50%) rotate(15deg) translateY(-8px); }
        }
        @keyframes loadingCloudFloat {
          0% { transform: translateX(0); }
          100% { transform: translateX(15px); }
        }
        @keyframes loadingBarFill {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}
