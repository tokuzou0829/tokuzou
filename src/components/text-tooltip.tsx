"use client";
import React, { useEffect, useRef } from "react";

export default function Tooltip({
  title,
  description,
  iamge,
}: {
  title: string;
  description: string;
  iamge: string;
}) {
  // ツールチップの参照を作成します。
  const tooltipRef = useRef<any>();

  const handleMouseOver = () => {
    const description = tooltipRef.current.querySelector(".description");
    if (description) {
      const tooltipRect = description.getBoundingClientRect();
      const shiftLeft = tooltipRect.left < 0 ? -tooltipRect.left : 0;
      const shiftRight =
        tooltipRect.right > window.innerWidth
          ? window.innerWidth - tooltipRect.right
          : 0;
      if (!description.style.transform) {
        description.style.transform = `translate(calc(-50% + ${shiftRight}px + ${shiftLeft}px), 0)`;
      }
    }
  };
  return (
    <div
      className="tooltip-container"
      ref={tooltipRef}
      onMouseOver={handleMouseOver}
    >
      <div className="tooltip">
        <span className="description bg-white shadow-lg flex overflow-hidden">
          <img src={iamge} className="w-[80px] h-[120px] object-cover "></img>
          <div className="ml-[10px] mr-[10px] flex flex-col text-left">
            <p className="font-bold">{title}</p>
            <p className="text-sm text-slate-600">{description}</p>
          </div>
        </span>
        <p className="underline decoration-dotted decoration-slate-400">
          {title}
        </p>
      </div>
    </div>
  );
}
