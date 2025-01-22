"use client";

import { useRef } from "react";

interface GaugeProps {
  value: number;
  onChange: (value: number) => void;
}

export function Gauge({ value, onChange }: GaugeProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  const getArcPath = (value: number) => {
    const radius = 50;
    const centerX = 50;
    const centerY = 50;
    const angle = (value / 100) * Math.PI;
    const startX = centerX - radius;
    const startY = centerY;
    const endX = centerX + radius * Math.cos(angle - Math.PI);
    const endY = centerY + radius * Math.sin(angle - Math.PI);
    return `M ${startX},${startY} A ${radius},${radius} 0 0,1 ${endX},${endY}`;
  };

  const handleInteraction = (event: React.MouseEvent | React.TouchEvent) => {
    if (!svgRef.current) return;

    const rect = svgRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    let clientX: number;
    let clientY: number;

    if ("touches" in event) {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else {
      clientX = event.clientX;
      clientY = event.clientY;
    }

    const dx = clientX - (rect.left + centerX);
    const dy = centerY - (clientY - rect.top);
    let angle = Math.atan2(dy, dx);

    if (angle < -Math.PI / 2) {
      angle = Math.PI + angle;
    }

    const newValue = Math.max(0, Math.min(100, ((Math.PI - angle) / Math.PI) * 100));
    onChange(newValue);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-[250px] sm:max-w-[300px]">
      <svg
        ref={svgRef}
        viewBox="-10 -10 120 80"
        className="w-full cursor-pointer"
        // onMouseDown={handleInteraction}
        // onMouseMove={(e) => e.buttons === 1 && handleInteraction(e)}
        // onTouchStart={handleInteraction}
        // onTouchMove={handleInteraction}
        aria-label="Gauge control"
        tabIndex={0}
      >
        <path
          d="M 0,50 A 50,50 0 1,1 100,50"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="5"
        />
        <path
          d={getArcPath(value)}
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
        />
        <line
          x1="50"
          y1="50"
          x2={50 + 45 * Math.cos((value / 100) * Math.PI - Math.PI)}
          y2={50 + 45 * Math.sin((value / 100) * Math.PI - Math.PI)}
          stroke="black"
          strokeWidth="2"
        />
        <circle cx="50" cy="50" r="3" fill="black" />
        <text x="5" y="55" className="text-xs fill-gray-500 select-none">
          0
        </text>
        <text x="85" y="55" className="text-xs fill-gray-500 select-none">
          100
        </text>
      </svg>
      <div className="mt-2 sm:mt-4 text-2xl sm:text-3xl font-bold">{Math.round(value)}%</div>
    </div>
  );
}

