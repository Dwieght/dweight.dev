"use client";

import React, { useState, useEffect } from "react";

interface AnimatedTextProps {
  texts: string[];
  speed?: number;
  deleteSpeed?: number;
  pauseTime?: number;
  className?: string;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  texts,
  speed = 100,
  deleteSpeed = 50,
  pauseTime = 2000,
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseTime);
      return () => clearTimeout(pauseTimeout);
    }

    const currentText = texts[currentIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(currentText.substring(0, displayText.length + 1));
          if (displayText === currentText) {
            setIsPaused(true);
          }
        } else {
          setDisplayText(currentText.substring(0, displayText.length - 1));
          if (displayText === "") {
            setIsDeleting(false);
            setCurrentIndex((prev) => (prev + 1) % texts.length);
          }
        }
      },
      isDeleting ? deleteSpeed : speed
    );

    return () => clearTimeout(timeout);
  }, [
    displayText,
    isDeleting,
    isPaused,
    currentIndex,
    texts,
    speed,
    deleteSpeed,
    pauseTime,
  ]);

  return (
    <span className={`relative ${className}`}>
      <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
        {displayText}
      </span>
      <span className="animate-pulse text-indigo-600 ml-1 font-thin">|</span>
    </span>
  );
};
