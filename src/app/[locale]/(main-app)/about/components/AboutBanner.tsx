import Image from "next/image";
import React from "react";
import SubHeader from "../../../../../../components/layout/SubHeader";

const AboutBanner = () => {
  return (
    <div
      className="relative h-screen w-full overflow-hidden "
      aria-label="Website banner"
    >
      <Image
        src="/assets/about-img.webp"
        alt="Company Logo"
        fill
        draggable={false}
      />

      <div className="absolute inset-0 bg-black/80" />

      <div className="relative z-10 flex h-full flex-col justify-center   gap-4  pl-6  lg:pl-[130px] lg:r-0 ">
        <h1 className=" text-2xl md:text-4xl lg:text-6xl font-medium mb-4 transition-all max-w-2xl lg:pr-[130px]">
          RISING ABOVE THE NORMS
        </h1>
        <SubHeader title=" ABOUT EL ATTAL HOLDING " isLineBefore={true} />
      </div>
      <span className="scroll-indicator" />
    </div>
  );
};

export default AboutBanner;
