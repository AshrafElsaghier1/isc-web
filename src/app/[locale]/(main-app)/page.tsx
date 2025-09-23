import React from "react";
import BannerSection from "./components/BannerSection";
import HomeCarousel from "./components/homeCarousel";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=2000&auto=format&fit=crop",
    title: "Central Business District",
    description:
      "EPDM 110,000 m² • Bitumen 200,000 m² • Cement-based 70,000 m² • Crystalline 30,000 m² • Polyurea 10,000 m² • Thermal 10,000 m² • Epoxy floor 10,000 m².",
    href: "/projects/cbd-towers",
    ctaLabel: "View CBD Project",
  },
  {
    image:
      "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=2000&auto=format&fit=crop",
    title: "Central Business District",
    description:
      "EPDM 110,000 m² • Bitumen 200,000 m² • Cement-based 70,000 m² • Crystalline 30,000 m² • Polyurea 10,000 m² • Thermal 10,000 m² • Epoxy floor 10,000 m².",
    href: "/projects/cbd-towers",
    ctaLabel: "View CBD Project",
  },
  {
    image:
      "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=2000&auto=format&fit=crop",
    title: "Central Business District",
    description:
      "EPDM 110,000 m² • Bitumen 200,000 m² • Cement-based 70,000 m² • Crystalline 30,000 m² • Polyurea 10,000 m² • Thermal 10,000 m² • Epoxy floor 10,000 m².",
    href: "/projects/cbd-towers",
    ctaLabel: "View CBD Project",
  },
];

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <BannerSection />
      <HomeCarousel slides={slides} autoplayMs={5500} />
    </>
  );
};

export default Home;
