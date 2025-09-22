"use client";

import { useEffect, useState } from "react";

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 1));
    }, 45);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      onComplete?.();
    }
  }, [progress, onComplete]);

  return (
    <div
      id="loader"
      className="loader loader-animation slideUp relative w-full h-full"
    >
      <span
        className="h-[1px] bg-primary absolute top-[calc(33.3%-1px)] left-0"
        style={{ width: progress + "%" }}
      ></span>
      <span
        className="bottom-[calc(33.3%-1px)] bg-primary h-[1px] absolute right-0"
        style={{ width: progress + "%" }}
      ></span>
      <span
        className="right-[calc(33.3%-1px)] bg-primary absolute w-[1px]"
        style={{ height: progress + "%" }}
      ></span>
      <span
        className="left-[calc(33.3%-1px)] bg-primary absolute w-[1px] bottom-0"
        style={{ height: progress + "%" }}
      ></span>

      <div className="absolute bottom-18 left-4 font-extrabold text-3xl text-primary">
        <span className="mx-2 min-w-[100px] flex gap-2">{progress}%</span>
      </div>
    </div>
  );
};

export default Loader;
