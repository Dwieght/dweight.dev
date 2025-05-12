"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  texts: string[];
  className?: string;
  interval?: number;
}

export function AnimatedText({
  texts,
  className,
  interval = 3000,
}: AnimatedTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Handle the fade out and text change
    const fadeOutTimeout = setTimeout(() => {
      setIsVisible(false);

      // Change text after fade out
      const changeTextTimeout = setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setIsVisible(true);
      }, 500); // Half a second for the fade out

      return () => clearTimeout(changeTextTimeout);
    }, interval - 500); // Total interval minus fade time

    return () => clearTimeout(fadeOutTimeout);
  }, [currentIndex, interval, texts.length]);

  return (
    <span
      className={cn(
        "transition-opacity duration-500",
        isVisible ? "opacity-100" : "opacity-0",
        className
      )}
    >
      {texts[currentIndex]}
    </span>
  );
}
