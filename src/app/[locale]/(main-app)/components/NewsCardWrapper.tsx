"use client";

import { ReactNode, useRef, useState } from "react";
import { Card } from "../../../../../components/ui/card";

const NewsCardWrapper = ({ children }: { children: ReactNode }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);

    const clamp = (num: number, min: number, max: number) =>
      Math.min(Math.max(num, min), max);

    setMousePosition({ x: clamp(x, -1, 1), y: clamp(y, -1, 1) });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <div className="relative h-full" style={{ perspective: "1000px" }}>
      <Card
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="border bg-transparent rounded-none border-gray-400 
                   transition-all duration-400 ease-out
                   hover:border-transparent hover:shadow-[0_0_40px_#292d2e] p-0
                   will-change-transform h-full"
        style={{
          transform: `rotateX(${mousePosition.y * 15}deg) rotateY(${
            mousePosition.x * 15
          }deg)`,
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-none opacity-40"
          style={{
            background: `radial-gradient(
              circle at ${50 + mousePosition.x * 50}% ${
              50 + mousePosition.y * 50
            }%,
              rgba(255,255,255,0.2), transparent 60%
            )`,
          }}
        />
        {children}
      </Card>
    </div>
  );
};

export default NewsCardWrapper;
