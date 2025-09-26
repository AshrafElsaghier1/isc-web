import React from "react";
import SubHeader from "../../../../../components/layout/SubHeader";
import NewsCard from "./NewsCard";
const newsData = [
  {
    id: 1,
    category: "GENERAL",
    title: "El Attal Holding Signs Construction Agreement...",
    description:
      "As part of the strategic alliance between El Attal Holding and Arab Contractors, the two companies have...",
    date: "Sep 04, 2025",
  },
  {
    id: 2,
    category: "GENERAL",
    title: "Attal Properties is launching West Leaves...",
    description:
      "Attal Properties is launching West Leaves Business Hub, a one of a kind destination in the heart of Sheikh...",
    date: "Sep 01, 2025",
  },
  {
    id: 3,
    category: "GENERAL",
    title: "Maisonettes Launch Event",
    description:
      "As part of its ongoing commitment to engaging with its success partners, Attal Properties hosted a special eve...",
    date: "Jul 08, 2025",
  },
  {
    id: 4,
    category: "GENERAL",
    title: "El Attal Holding Forges Strategic Partnership...",
    description:
      "El Attal Holding has announced a groundbreaking strategic partnership that will revolutionize the construction industry...",
    date: "Jun 15, 2025",
  },
  {
    id: 5,
    category: "GENERAL",
    title: "Attal X The Diplomatic Football Tournament...",
    description:
      "Attal Properties proudly sponsored The Diplomatic Football Tournament, bringing together international communities...",
    date: "May 22, 2025",
  },
  {
    id: 6,
    category: "GENERAL",
    title: "'Beit Wara Beit' Ramadan Campaign X El Attal Holding",
    description:
      "El Attal Holding launched its heartwarming Ramadan campaign 'Beit Wara Beit' focusing on community values...",
    date: "Apr 10, 2025",
  },
];

const MediaSection = () => {
  return (
    <section className="px-6  lg:pl-[130px] lg:pr-18   mb-12 bg-background relative z-50">
      <SubHeader title="MEDIA CENTER" />
      <h3 className=" text-2xl md:text-4xl lg:text-6xl font-medium mb-4 transition-all">
        Our Latest Updates
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 pt-4 pr-10 items-stretch">
        {newsData.map((news) => (
          <div key={news.id} className="h-full">
            <NewsCard {...news} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default MediaSection;
