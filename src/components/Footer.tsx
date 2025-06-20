import type { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdRequestQuote } from "react-icons/md";
import { FaRankingStar } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { PiSpinnerBallFill } from "react-icons/pi";
import type { IconType } from "react-icons";

interface NavItem {
    to: string;
    label: string;
    icon: IconType;
    alt: string;
}

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
    const location = useLocation();

    const navItems: NavItem[] = [
        {
            to: "/",
            label: "Spin",
            icon: PiSpinnerBallFill,
            alt: "Spin Icon",
        },
        {
            to: "/quest",
            label: "Quest",
            icon: MdRequestQuote,
            alt: "Quest Icon",
        },
        {
            to: "/rank",
            label: "Ranks",
            icon: FaRankingStar,
            alt: "Ranks Icon",
        },
        {
            to: "/profile",
            label: "Profile",
            icon: FaUser,
            alt: "Profile Icon",
        },
    ];

    return (
        <div className="flex justify-center w-full py-3 px-4 z-[100]">
            <div className="flex justify-between items-center gap-2 w-full max-w-[400px]">
                {navItems.map((item) => {
                    const IconComponent = item.icon as React.FC<{ size?: number; color?: string }>;
                    return (
                        <Link
                            key={item.to}
                            to={item.to}
                            className="flex-1"
                        >
                            <div
                                className={`flex items-center justify-center gap-1.5 rounded-lg h-[43px] font-bold text-[10px] leading-[12.8px] transition-colors ${
                                    location.pathname === item.to
                                        ? "bg-[#3A3B3F] text-[#E879F9] border border-[#E879F9]"
                                        : "bg-[#3A3B3F] text-[#D9D9D9] border border-[#D9D9D9]"
                                }`}
                                aria-label={item.alt}
                            >
                                <IconComponent
                                    size={20}
                                    color={location.pathname === item.to ? "#E879F9" : "#D9D9D9"}
                                />
                                {item.label}
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default Footer;