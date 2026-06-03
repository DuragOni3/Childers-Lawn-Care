"use client";

import { useRef } from "react";

export default function Tilt3DCard({ children, className = "" }) {
  const cardRef = useRef(null);

  const onMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = (e.clientX - left) / width  - 0.5;  // -0.5 to 0.5
    const y = (e.clientY - top)  / height - 0.5;
    card.style.transform = `perspective(700px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) translateZ(8px)`;
    card.style.boxShadow = `${-x * 20}px ${y * 20}px 40px rgba(0,0,0,0.3)`;
  };

  const onLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(700px) rotateY(0deg) rotateX(0deg) translateZ(0)";
    card.style.boxShadow = "";
  };

  return (
    <div
      ref={cardRef}
      className={`tilt-card ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}
