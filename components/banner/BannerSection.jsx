import Image from "next/image";
import React from "react";
import logo from "../../public/assets/logo.png";
import { useLocale } from "next-intl";

const BannerSection = () => {
  const locale = useLocale();

  return (
    <section
      className="relative h-screen w-full overflow-hidden"
      aria-label="Website banner"
    >
      <video
        className="absolute top-0 left-0 h-full w-full object-cover"
        src="/assets/video.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        poster="/assets/logo.png"
        aria-hidden="true"
      />

      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-4 text-center px-4">
        <Image
          src={logo}
          alt="Company Logo"
          width={120}
          draggable={false}
          className="animate__animated animate__fadeInDown animate__delay-1s"
        />
        <h1 className="uppercase text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg animate__animated animate__lightSpeedInRight animate__delay-2s">
          Welcome to <span className="text-main">Our Website</span>
        </h1>
        <p className="max-w-lg text-base md:text-lg text-gray-200 mt-2 animate__animated animate__fadeInUp animate__delay-3s">
          Your gateway to premium digital solutions — crafted with innovation
          and passion.
        </p>
      </div>
      <span className="scroll-indicator" />
    </section>
  );
};

export default BannerSection;
