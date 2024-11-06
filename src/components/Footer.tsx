import type { FC } from "react";
import { Link, useLocation } from "react-router-dom";

import Quest_active from "../assets/quest_white.png";
import Quest_inactive from "../assets/quest_w.svg";
import Rank_active from "../assets/rank_yellow.svg";
import Rank_inactive from "../assets/rank.svg";
import Profile_active from "../assets/profile_yellow.svg";
import Profile_inactive from "../assets/profile_white.svg";

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  const location = useLocation();

  return (
    <div className="fixed bottom-6 left-0 w-full bg-transparent flex justify-between px-10 z-100">
      <Link to={"/"}>
        <div
          className={`btn rounded-[8px] w-[96px] h-[43px] flex items-center justify-center font-[700] text-[10px] leading-[12.8px] gap-1 ${
            location.pathname === "/" ? "text-[#F7FF98]" : "text-[#D9D9D9]"
          } bg-[#3A3B3F]`}
          style={{
            border: `${
              location.pathname === "/"
                ? "1px solid #F7FF98"
                : "1px solid #D9D9D9"
            }`,
          }}
        >
          <img
            src={location.pathname === "/" ? Quest_active : Quest_inactive}
            className="w-[22px] h-[22px]"
            alt="Quest Logo"
          />
          Quest
        </div>
      </Link>
      <Link to={"/rank"}>
        <div
          className={`btn rounded-[8px] w-[96px] h-[43px] flex items-center justify-center font-[700] text-[10px] leading-[12.8px] gap-1 ${
            location.pathname === "/rank" ? "text-[#F7FF98]" : "text-[#D9D9D9]"
          } bg-[#3A3B3F]`}
          style={{
            border: `${
              location.pathname === "/rank"
                ? "1px solid #F7FF98"
                : "1px solid #D9D9D9"
            }`,
          }}
        >
          <img
            src={location.pathname === "/rank" ? Rank_active : Rank_inactive}
            className="w-[19px] h-[19px]"
            alt="Quest Logo"
          />
          Ranks
        </div>
      </Link>
      <Link to={"/profile"}>
        <div
          className={`btn rounded-[8px] w-[96px] h-[43px] flex items-center justify-center font-[700] text-[10px] leading-[12.8px] gap-1 ${
            location.pathname === "/profile"
              ? "text-[#F7FF98]"
              : "text-[#D9D9D9]"
          } bg-[#3A3B3F]`}
          style={{
            border: `${
              location.pathname === "/profile"
                ? "1px solid #F7FF98"
                : "1px solid #D9D9D9"
            }`,
          }}
        >
          <img
            src={
              location.pathname === "/profile"
                ? Profile_active
                : Profile_inactive
            }
            className="w-[17px] h-[17px]"
            alt="Quest Logo"
          />
          Profiles
        </div>
      </Link>
    </div>
  );
};

export default Footer;
