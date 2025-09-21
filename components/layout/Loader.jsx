"use client";

import { useEffect, useState } from "react";

const Loader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(1);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) return prev + 1;
        return prev;
      });
    }, 45);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div id="loader" className="loader loader-animation slideUp">
        <span
          className=" h-[1px] bg-[#eace9b] absolute top-[calc(33.3%-1px)] left-0"
          style={{ width: progress + "%" }}
        ></span>
        <span
          className=" bottom-[calc(33.3%-1px)] bg-[#eace9b] h-[1px] absolute right-0"
          style={{ width: progress + "%" }}
        ></span>
        <span
          className=" right-[calc(33.3%-1px)] bg-[#eace9b] absolute w-[1px]"
          style={{ height: progress + "%" }}
        ></span>
        <span
          className=" left-[calc(33.3%-1px)] bg-[#eace9b] absolute w-[1px] bottom-0"
          style={{ height: progress + "%" }}
        ></span>
        <div className="absolute bottom-18  right-4 font-extrabold text-3xl text-[#eace9b]">
          <span className="mx-2 min-w-[100px] flex gap-2 ">{progress}%</span>
        </div>
      </div>
    </>
  );
};

export default Loader;
