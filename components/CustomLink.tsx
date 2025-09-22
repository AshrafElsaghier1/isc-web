import Link from "next/link";
import { ReactNode } from "react";

const CustomLink = ({
  icon,
  label,
  href,
}: {
  icon: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <Link href={href} className=" custom-link group   after:rounded-inherit">
      <span className="  custom-link-label   ">{label}</span>
      <div className="custom-link-icon">{icon}</div>
    </Link>
  );
};

export default CustomLink;
