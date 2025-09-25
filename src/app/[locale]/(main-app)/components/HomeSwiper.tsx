"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import SubHeader from "../../../../../components/layout/SubHeader";
import CustomLink from "../../../../../components/CustomLink";
import { FaArrowRightLong } from "react-icons/fa6";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const slides = [
  {
    image: "/assets/carousel.webp",
    title: "Attal Properties",
    description:
      "EPDM 110,000 m² • Bitumen 200,000 m² • Cement-based 70,000 m² • Crystalline 30,000 m² • Polyurea 10,000 m² • Thermal 10,000 m² • Epoxy floor 10,000 m².",
    href: "/projects/cbd-towers",
    ctaLabel: "View CBD Project",
  },
  {
    image: "/assets/carousel.webp",
    title: "Central Business",
    description:
      "EPDM 110,000 m² • Bitumen 200,000 m² • Cement-based 70,000 m² • Crystalline 30,000 m² • Polyurea 10,000 m² • Thermal 10,000 m² • Epoxy floor 10,000 m².",
    href: "/projects/cbd-towers",
    ctaLabel: "View CBD Project",
  },
  {
    image: "/assets/carousel.webp",
    title: "Central Business",
    description:
      "EPDM 110,000 m² • Bitumen 200,000 m² • Cement-based 70,000 m² • Crystalline 30,000 m² • Polyurea 10,000 m² • Thermal 10,000 m² • Epoxy floor 10,000 m².",
    href: "/projects/cbd-towers",
    ctaLabel: "View CBD Project",
  },
];
const swiperPagination: any = {
  type: "fraction",
  formatFractionCurrent: (number: number) =>
    number < 10 ? "0" + number : number,
  formatFractionTotal: (number: number) =>
    number < 10 ? "0" + number : number,
};

export default function ProjectSwiper() {
  const duration = 700000;
  const progressBar = useRef<HTMLDivElement>(null);

  const onAutoplayTimeLeft = (_: any, __: number, progress: number) => {
    if (progressBar.current) {
      progressBar.current.style.width = `${(1 - progress) * 100}%`;
    }
  };

  return (
    <Swiper
      modules={[Navigation, Autoplay, Pagination]}
      autoplay={{ delay: duration, disableOnInteraction: false }}
      navigation={{
        nextEl: ".custom-next",
        prevEl: ".custom-prev",
      }}
      pagination={swiperPagination}
      loop
      className="w-full h-full relative  overflow-visible"
      onAutoplayTimeLeft={onAutoplayTimeLeft}
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
        <SwiperSlide key={index} className="overflow-visible">
          <div className="relative w-full  h-[100vh] before:content-[''] before:z-10 before:absolute before:inset-0 before:bg-black/50 slide-img">
            <div>
              <Image
                alt="Background"
                className="object-cover h-full w-full max-h-[100vh]"
                src="/assets/carousel.webp"
                fill
              />
            </div>
          </div>
          <div className="p-12 bg-main-dark gap-4 lg:max-w-[65%] max-w-[85%] absolute z-50 right-0 bottom-0">
            <div className="grid grid-cols-12  items-center">
              <div className="col-span-4 p-4">
                <Image
                  src={"/assets/banner-2.webp"}
                  alt="Background"
                  width={200}
                  height={200}
                />
              </div>
              <div className="col-span-8 border-l-1 border-white/60 pl-6">
                <SubHeader title={"Central Business"} />
                <p className="text-sm text-secondary">
                  Bayside, a refined piece of South Sinai, a red sea coastal
                  town, characterized by its natural beauty of curved golden
                  sand beaches and by its soul easing atmosphere of purity and
                  simplicity.
                </p>
                <Link href={"/"} className="mt-5 flex gap-3 items-center">
                  {" "}
                  learn more <FaArrowRightLong />{" "}
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
      <div
        className="py-2 w-full max-w-[350px] absolute top-[60%]   -translate-x-1/2 -translate-y-1/2 z-20
       left-1/2 rtl:right-1/2  rtl:translate-x-1/2"
      >
        <button className="transtion-all p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 custom-prev absolute ltr:left-0 rtl:right-0 top-1/2 -translate-y-1/2 z-10">
          <ChevronLeft className="text-white w-8 h-8 rtl:hidden" />
          <ChevronRight className="text-white w-8 h-8 ltr:hidden" />
        </button>
        <button className="transtion-all p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20   custom-next absolute ltr:right-0 rtl:left-0 top-1/2 -translate-y-1/2 z-10">
          <ChevronRight className="text-white w-8 h-8 rtl:hidden" />
          <ChevronLeft className="text-white w-8 h-8 ltr:hidden" />
        </button>
        <div className="absolute -bottom-6 ltr:left-2 rtl:right-2 w-full h-[3px] bg-white/30 rounded-3xl max-w-[95%]">
          <div
            ref={progressBar}
            className="h-[3px] bg-main transition-all duration-75 rounded-3xl max-w-[95%]"
            style={{ width: "0%" }}
          ></div>
        </div>
      </div>
    </Swiper>
  );
}
