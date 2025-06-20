import React, { useEffect } from "react";
import { FaCopy } from "react-icons/fa";
import { toast } from "react-toastify";
import Breadcrumb from "../components/Breadcrumb";
import { useProvider } from "../provider/AppProvider";

interface ProfileProps { }

const FaCopyIcon = FaCopy as React.FC<{ color: string; size: number }>;

const Profile: React.FC<ProfileProps> = () => {
    const { user, getUser } = useProvider();

    useEffect(() => {
        if (!localStorage.getItem("userid")) return;
        getUser(localStorage.getItem("userid") as string);
    }, []);

    const copyToClipboard = async () => {
        const referralLink = `https://t.me/hubic_ai_bot?start=${user?.username}`;

        try {
            await navigator.clipboard.writeText(referralLink)
            toast("Your referral link copied")
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <Breadcrumb title="Profile" description="Manage your Profile" />

            <div className="flex flex-col gap-2">
                <p className="font-[700] text-[14px] leading-[15.36px] text-[#FFFFFF]">
                    Username
                </p>
                <input
                    type="text"
                    placeholder="talhatahir789"
                    className="bg-[#202221] bg-opacity-50 backdrop-blur-[2px] rounded-[8px] text-white placeholder:text-[#FFFFFF] placeholder:text-[9px] placeholder:font-[700] placeholder:leading-[11.52px] py-[15px] pl-4 text-[12px] border-[1px] border-white border-opacity-30"
                    value={user?.username}
                    readOnly
                />
                <p className="text-[11px] leading-[10.24px] text-[#D9D9D9] font-[700]">
                    Your official Telegram username
                </p>
            </div>

            <div
                className="w-full h-[1px]"
                style={{ borderBottom: "1px solid #5A5151" }}
            ></div>

            <div className="flex flex-col gap-2">
                <p className="font-[700] text-[14px] leading-[15.36px] text-[#FFFFFF]">
                    Your referral link
                </p>
                <input
                    type="text"
                    placeholder="Your referral link"
                    disabled
                    className="bg-[#202221] bg-opacity-50 backdrop-blur-[2px] rounded-[8px] text-white placeholder:text-[#FFFFFF] placeholder:text-[9px] placeholder:font-[700] placeholder:leading-[11.52px] py-[15px] pl-4 text-[12px] border-[1px] border-white border-opacity-30"
                    value={`https://t.me/hubic_ai_bot?start=${user?.username}`}
                />
                <button
                    className="flex justify-center items-center gap-2 bg-[#E879F9] shadow-md rounded-[8px] py-[16px] text-white font-[700] text-[14px] leading-[11.52px] mt-2"
                    onClick={copyToClipboard}
                >
                    <FaCopyIcon color="white" size={20} />
                    Copy Referral link
                </button>
            </div>
        </div>
    );
};

export default Profile;
