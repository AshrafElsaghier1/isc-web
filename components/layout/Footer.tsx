import Link from "next/link";
import { FaFacebookF } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import CustomLink from "../CustomLink";
import { Mail } from "lucide-react";
import Image from "next/image";

const socialIcons = [
  { Icon: <FaInstagram size="24" />, link: "#" },
  { Icon: <FaYoutube size="24" />, link: "#" },
  { Icon: <FaFacebookF size="24" />, link: "#" },
  { Icon: <FaLinkedinIn size="24" />, link: "#" },
];
export default function Footer() {
  return (
    <footer className=" text-white  ">
      <div className="grid grid-cols-12 gap-4 ">
        <div className="col-span-12 md:col-span-9    order-2 md:order-1  grid grid-cols-12 gap-2 px-6   pb-8 pt-12 md:pe-0 md:ps-12 shadow-[inset_0_0_40px_#292d2ec7]">
          <div className="col-span-12 md:col-span-4">
            <h5 className="font-semibold text-primary mb-1.5 "> HEAD OFFICE</h5>
            <Link
              target="_blank"
              className="text-base hover:text-primary-hover transition-colors"
              href="#"
            >
              B 61. Salah Salem, El Orouba. Heliopolis. Cairo. Egypt - SALES
              OFFICE : B4 Arkan Plaza Sheikh Zayed , Giza . Egypt
            </Link>
          </div>
          <div className="col-span-12 md:col-span-4 flex gap-8 md:block items-center">
            <div>
              <h5 className="font-semibold text-primary mb-1.5 "> EMAIL US </h5>
              <Link
                target="_blank"
                className="text-base hover:text-primary-hover transition-colors"
                href="mailto:info@test.com"
              >
                info@test.com
              </Link>
            </div>
            <div>
              <h5 className="font-semibold text-primary mb-1.5 md:mt-4 ">
                FOLLOW US
              </h5>
              <ul className="flex  ">
                {socialIcons.map(({ link, Icon }, index) => (
                  <li className="me-4" key={index}>
                    <Link
                      target="_blank"
                      href={link}
                      className="hover:text-primary-hover transition-colors"
                    >
                      {Icon}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-span-12 md:col-span-4 flex gap-16 md:flex-col  md:gap-6 ">
            <div>
              <h5 className="font-semibold text-primary mb-1.5    ">HOTLINE</h5>
              <Link
                target="_blank"
                className="text-base hover:text-primary-hover transition-colors"
                href="tel:123456"
              >
                123456
              </Link>
            </div>
            <div>
              <CustomLink
                label="Send A Message"
                href="/"
                icon={<Mail color="white" size={24} />}
              />
            </div>
          </div>
          <div className="mt-5  grid    grid-cols-3   col-span-12 gap-4  w-full">
            <p className="text-sm text-muted"> © ISC Holding, 2025 </p>
            <Link
              href="/"
              className="text-sm text-muted underline hover:text-primary-hover w-fit transition-all"
            >
              Privacy Policy
            </Link>
            <p className="text-sm text-muted"> Made with ❤ </p>
          </div>
        </div>

        <div className=" order-1 md:order-2 col-span-12 md:col-span-3  flex justify-center items-center  p-4">
          <Image
            src="/assets/logo.png"
            alt="Company Logo"
            width={120}
            height={120}
          />
        </div>
      </div>
    </footer>
  );
}
