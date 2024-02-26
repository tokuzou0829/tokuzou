"use client";
import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";
export default function ArrowDownBody() {
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY === 0) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);
  return (
    <div
      className={`mt-[30px] flex justify-center ${
        isVisible ? "opacity-100" : "opacity-0"
      } fadeInOut`}
    >
      <ArrowDown />
    </div>
  );
}
