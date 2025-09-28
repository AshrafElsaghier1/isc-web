"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination, Parallax } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/parallax";
import SubHeader from "../../../../../components/layout/SubHeader";
import CustomLink from "../../../../../components/CustomLink";
import { FaArrowRightLong } from "react-icons/fa6";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import Link from "next/link";
const slides = [
  {
    banner: "/assets/carousel.webp",
    title: "Attal Properties",
    description:
      "EPDM 110,000 m² • Bitumen 200,000 m² • Cement-based 70,000 m² • Crystalline 30,000 m² • Polyurea 10,000 m² • Thermal 10,000 m² • Epoxy floor 10,000 m².",
    href: "/projects/cbd-towers",
    ctaLabel: "View CBD Project",
    img: "/assets/banner.webp",
  },
  {
    banner: "/assets/carousel.webp",
    title: "Central Business",
    description:
      "EPDM 110,000 m² • Bitumen 200,000 m² • Cement-based 70,000 m² • Crystalline 30,000 m² • Polyurea 10,000 m² •  .",
    href: "/projects/cbd-towers",
    ctaLabel: "View CBD Project",
    img: "/assets/banner-2.webp",
  },
  {
    banner: "/assets/carousel.webp",
    title: "Central Business",
    description:
      "  Crystalline 30,000 m² • Polyurea 10,000 m² • Thermal 10,000 m² • Epoxy floor 10,000 m².",
    href: "/projects/cbd-towers",
    ctaLabel: "View CBD Project",
    img: "/assets/banner.webp",
  },
];
const swiperPagination: any = {
  type: "fraction",
  formatFractionCurrent: (number: number) =>
    number < 10 ? "0" + number : number,
  formatFractionTotal: (number: number) =>
    number < 10 ? "0" + number : number,
};
const duration = 4000;

export default function HeroSlider() {
  const progressBar = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const onAutoplayTimeLeft = (_: any, __: number, progress: number) => {
    if (progressBar.current) {
      progressBar.current.style.width = `${(1 - progress) * 100}%`;
    }
  };
  const contentRef = useRef<HTMLDivElement | null>(null);
  const handleSlideChangeStart = () => {
    if (contentRef.current) {
      contentRef.current.classList.remove("animate__fadeInUp");
      contentRef.current.classList.add("animate__fadeOutDown");
    }
  };
  const handleSlideChangeEnd = (swiper: any) => {
    if (contentRef.current) {
      contentRef.current.classList.remove("animate__fadeOutDown");
      contentRef.current.classList.add("animate__fadeInUp");
    }
    setActiveIndex(swiper.realIndex);
  };
  return (
    <section className="relative pb-[220px] overflow-hidden">
      <Swiper
        modules={[Navigation, Autoplay, Pagination, Parallax]}
        autoplay={{ delay: duration, disableOnInteraction: false }}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        speed={2000}
        loop
        className="w-full h-full"
        pagination={swiperPagination}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        onSlideChangeTransitionStart={handleSlideChangeStart}
        onSlideChangeTransitionEnd={handleSlideChangeEnd}
      >
        <div className=" absolute z-3  text-white md:max-w-[60%] pl-6  lg:pl-[130px] lg:r-0  top-20 ">
          <SubHeader title={"Central Business"} />
          <h3 className=" text-2xl md:text-4xl lg:text-5xl font-medium mb-4 transition-all max-w-[70%] leading-[1.2]">
            Unique Real Estate Signatures
          </h3>
          <div className="mt-3 relative z-40">
            <CustomLink href="/" label="Projects" icon={<FaArrowRightLong />} />
          </div>
        </div>
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="  ">
            <div className="relative w-full h-[100vh]  slide-img bg-background/70">
              <Image
                alt="Background"
                className="object-cover h-full w-full reveal-img"
                src={slide.banner}
                fill
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        className={`
    content-box  p-12 bg-main-dark gap-4 lg:max-w-[64%] max-w-[85%]  absolute  z-[5] right-0 top-[47%]   animate__animated animate__fadeInUp  `}
        ref={contentRef}
      >
        <div className="grid grid-cols-12 items-center ">
          <div className="col-span-12 md:col-span-4 p-4">
            <Image
              src={slides[activeIndex].img}
              alt={slides[activeIndex].title}
              width={200}
              height={200}
            />
          </div>
          <div className="col-span-12 md:col-span-8 border-l border-white/60 pl-6">
            <SubHeader title={slides[activeIndex].title} />
            <p className="text-sm text-secondary">
              {slides[activeIndex].description}
            </p>
            <Link
              href={slides[activeIndex].href}
              className="mt-5 flex gap-3 items-center"
            >
              {slides[activeIndex].ctaLabel} <FaArrowRightLong />
            </Link>
          </div>
        </div>
      </div>
      <div
        className="py-2 w-full max-w-[350px] absolute top-[40%] -translate-x-1/2 -translate-y-[40%] z-20
         left-1/2 rtl:right-1/2 rtl:translate-x-1/2"
      >
        <button
          aria-label="Previous Slide"
          className="group transition-all duration-300 p-2 rounded-full bg-white/10 backdrop-blur-sm
           hover:bg-white/20
           custom-prev absolute ltr:left-0 rtl:right-0 top-1/2 -translate-y-1/2 z-10
           shadow-md focus:outline-none focus:ring-2 focus:ring-main/50"
        >
          <ChevronLeft className="text-white w-8 h-8 rtl:hidden group-hover:scale-110 transition-transform" />
          <ChevronRight className="text-white w-8 h-8 ltr:hidden group-hover:scale-110 transition-transform" />
        </button>
        <button
          aria-label="Next Slide"
          className="group transition-all duration-300 p-2 rounded-full bg-white/10 backdrop-blur-sm
           hover:bg-white/20
           custom-next absolute ltr:right-0 rtl:left-0 top-1/2 -translate-y-1/2 z-10
           shadow-md focus:outline-none focus:ring-2 focus:ring-main/50"
        >
          <ChevronRight className="text-white w-8 h-8 rtl:hidden group-hover:scale-110 transition-transform" />
          <ChevronLeft className="text-white w-8 h-8 ltr:hidden group-hover:scale-110 transition-transform" />
        </button>

        <div className="absolute -bottom-6 ltr:left-2 rtl:right-2 w-full h-[3px] bg-white/30 rounded-3xl max-w-[95%]">
          <div
            ref={progressBar}
            className="h-[3px] bg-main transition-[width] duration-300 ease-linear rounded-3xl"
            style={{ width: "0%" }}
          ></div>
        </div>
      </div>
    </section>
  );
}
