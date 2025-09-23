const SubHeader = ({ title }: { title: string }) => {
  return (
    <h2 className="  text-[18px] lg:text-3xl lg:tracking-[5.5px]  mb-2 inline-block text-primary   relative after:content-[''] after:h-[1px] after:absolute after:w-[120px]   after:bg-primary  after:right-0 after:bottom-1/2  animate__animated animate__fadeInUp pe-[130px]">
      {title}
    </h2>
  );
};

export default SubHeader;
