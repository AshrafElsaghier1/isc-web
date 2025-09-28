import clsx from "clsx";

const SubHeader = ({
  title,
  isLineBefore,
}: {
  title: string;
  isLineBefore?: boolean;
}) => {
  return (
    <h2
      className={clsx(
        "text-[18px] lg:text-3xl lg:tracking-[5.5px] mb-2 inline-block text-primary w-fit relative animate__animated animate__fadeInUp",
        isLineBefore
          ? "before:content-[''] before:h-[1px] before:absolute before:w-[120px] before:bg-primary before:left-0 before:bottom-1/2 ps-[130px] before:z-40"
          : "after:content-[''] after:h-[1px] after:absolute after:w-[120px] after:bg-primary after:right-0 after:bottom-1/2 pe-[130px] after:z-40"
      )}
    >
      {title}
    </h2>
  );
};

export default SubHeader;
