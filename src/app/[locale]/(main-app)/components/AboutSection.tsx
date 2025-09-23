import React from "react";
import SubHeader from "../../../../../components/layout/SubHeader";
import CustomLink from "../../../../../components/CustomLink";
import { FaArrowRightLong } from "react-icons/fa6";
import Image from "next/image";

const AboutSection = () => {
  return (
    <section>
      <div className="ps-6  lg:pl-[130px] lg:r-0  mt-20 grid grid-cols-12 ">
        <div className="col-span-12 md:col-span-8 md:pr-5 pt-10 ">
          <SubHeader title="A VISION" />
          <h3 className=" text-2xl md:text-4xl lg:text-6xl font-medium mb-4 transition-all">
            POWERED BY HERITAGE
          </h3>
          <p className="text-base">
            After a track record of surefootedness and integrity in the field of
            building, restoring and renovating residential, industrial
            commercial and public sectors, today, El Attal shines through with a
            vision empowered by its established heritage and reputation in the
            Egyptian market.
          </p>
          <div className="mt-8 mb-5">
            <CustomLink
              href="/"
              label=" About ISC"
              icon={<FaArrowRightLong size={20} />}
            />
          </div>
        </div>
        <div className=" hidden md:block col-span-4 bg-gradient-to-tr from-primary to-primary-hover shadow-[inset_0_0_40px_#e86e0acc,inset_0_0_40px_#080400aa] "></div>
      </div>
      <div className="flex justify-end ps-6  lg:pl-[130px]">
        <Image
          src="/assets/about-img.webp"
          alt="about-img"
          width={1200}
          height={350}
        />
      </div>
      <div className="grid place-items-center mt-5 ">
        <p className="max-w-3xl md:text-center  md:text-lg lg:text-[22px] px-6 md:px-2 mb-10">
          El Attal Holding strives to build a portfolio of sustainable companies
          which offer real-value projects and market-leading real estate
          developments with the end view of leveraging their value, delivering
          on quality and committing to the communities they work within.
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
