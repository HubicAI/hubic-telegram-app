import type { FC } from "react";

interface BreadcrumbProps {
  title: string;
  description: string;
}

const Breadcrumb: FC<BreadcrumbProps> = ({ title, description }) => {
  return (
    <div className="flex flex-col">
      <h1
        className="text-[33px] font-[700] leading-[48.87px] text-[#E879F9]"
        style={{ fontFamily: "Space Mono" }}
      >
        {title}
      </h1>
      {/*<p className="font-[700] text-[12px] leading-[15.36px] text-[#D9D9D9]">
        {description}
      </p>*/}
    </div>
  );
};

export default Breadcrumb;
