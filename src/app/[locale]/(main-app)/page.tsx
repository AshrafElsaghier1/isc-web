import BannerSection from "./components/BannerSection";
import AboutSection from "./components/AboutSection";
import MediaSection from "./components/MediaSection";
import HomeSwiper from "./components/HomeSwiper";
const slides = [
  {
    image: "/assets/carousel.webp",
    title: "Central Business District",
    description:
      "EPDM 110,000 m² • Bitumen 200,000 m² • Cement-based 70,000 m² • Crystalline 30,000 m² • Polyurea 10,000 m² • Thermal 10,000 m² • Epoxy floor 10,000 m².",
    href: "/projects/cbd-towers",
    ctaLabel: "View CBD Project",
  },
  {
    image: "/assets/carousel.webp",
    title: "Central Business District",
    description:
      "EPDM 110,000 m² • Bitumen 200,000 m² • Cement-based 70,000 m² • Crystalline 30,000 m² • Polyurea 10,000 m² • Thermal 10,000 m² • Epoxy floor 10,000 m².",
    href: "/projects/cbd-towers",
    ctaLabel: "View CBD Project",
  },
  {
    image: "/assets/carousel.webp",
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
      <BannerSection />
      <AboutSection />
      <HomeSwiper />
      <MediaSection />
    </>
  );
};

export default Home;
