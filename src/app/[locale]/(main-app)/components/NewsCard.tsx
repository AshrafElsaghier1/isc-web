import Image from "next/image";
import NewsCardWrapper from "./NewsCardWrapper";

const NewsCard = ({
  category,
  title,
  description,
  date,
}: {
  category: string;
  title: string;
  description: string;
  date: string;
}) => {
  return (
    <NewsCardWrapper>
      <div className="p-4 relative group overflow-hidden h-full flex flex-col justify-between">
        <span className="uppercase mb-2 text-primary text-[12px] inline-block relative ">
          {category}
        </span>
        <h3 className="text-xl line-clamp-2 mb-3 font-bold text-white/90 relative ">
          {title}
        </h3>
        <p className="text-[#dadada] text-sm line-clamp-3 mb-3 relative ">
          {description}
        </p>
        <div className="pt-4 border-t border-t-gray-400 relative ">
          <time dateTime="2025-09-24" className="font-light text-primary">
            {date}
          </time>
        </div>

        <Image
          src="/assets/card-img.webp"
          alt="card-img"
          fill
          className="object-cover translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out relative z-[-1]"
        />

        <div className="absolute inset-0 bg-black/65    translate-y-full group-hover:translate-y-0 transition-all duration-700 ease-in-out z-[-1]" />
      </div>
    </NewsCardWrapper>
  );
};

export default NewsCard;
