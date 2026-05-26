"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export default function ProfileHero() {
  const [isKawaii, setIsKawaii] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const tapCountRef = useRef(0);
  const tapTimerRef = useRef<number | null>(null);

  const revealKawaii = () => {
    setIsKawaii(true);
    setIsSpinning(true);
  };

  useEffect(() => {
    let progress = 0;

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target;

      if (
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
      ) {
        return;
      }

      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      progress = key === KONAMI_CODE[progress] ? progress + 1 : 0;

      if (progress === KONAMI_CODE.length) {
        revealKawaii();
        progress = 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleIconTap = () => {
    tapCountRef.current += 1;

    if (tapTimerRef.current) {
      window.clearTimeout(tapTimerRef.current);
    }

    if (tapCountRef.current >= 3) {
      tapCountRef.current = 0;
      revealKawaii();
      return;
    }

    tapTimerRef.current = window.setTimeout(() => {
      tapCountRef.current = 0;
      tapTimerRef.current = null;
    }, 800);
  };

  return (
    <div>
      <Image
        src={isKawaii ? "/kawaii.png" : "/me.png"}
        alt="This is me."
        width={200}
        height={200}
        className={`object-cover w-[200px] h-[200px] rounded-full m-auto mb-4 ${
          isSpinning ? "profile-kurutto" : ""
        }`}
        onClick={handleIconTap}
        onAnimationEnd={() => setIsSpinning(false)}
      />
      <p className="font-bold text-4xl">
        {isKawaii ? "Tokuo-Chan!!" : "Tokuzou Tanaka"}
      </p>
      <p className="text-gray-600">Japanese Programmer</p>
    </div>
  );
}
