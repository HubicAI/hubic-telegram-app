import React, { useEffect } from "react";
import { FaCopy } from "react-icons/fa";
import Breadcrumb from "../components/Breadcrumb";
import { useProvider } from "../provider/AppProvider";
import { useSnackbar } from "notistack";

interface ProfileProps { }

const FaCopyIcon = FaCopy as React.FC<{ color: string; size: number }>;

const Profile: React.FC<ProfileProps> = () => {
    const { user, getUser } = useProvider();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (!localStorage.getItem("userid")) return;
        getUser(localStorage.getItem("userid") as string);
    }, []);

    const copyToClipboard = async () => {
        const referralLink = `https://t.me/hubic_ai_bot?start=${user?.username}`;

        try {
            // Create temporary textarea
            const textArea = document.createElement("textarea");
            textArea.value = referralLink;
            textArea.style.position = "fixed";
            textArea.style.left = "-999999px";
            textArea.style.top = "-999999px";
            document.body.appendChild(textArea);

            // Select and copy text
            textArea.focus();
            textArea.select();
            document.execCommand('copy');

            // Remove temporary textarea
            document.body.removeChild(textArea);

            // Show success message
            enqueueSnackbar("Referral link copied successfully!", {
                variant: "success",
                anchorOrigin: { vertical: "top", horizontal: "right" },
            });
        } catch (error) {
            enqueueSnackbar("Failed to copy referral link", {
                variant: "error",
                anchorOrigin: { vertical: "top", horizontal: "right" },
            });
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
                    className="bg-[#202221] rounded-[8px] text-white placeholder:text-[#FFFFFF] placeholder:text-[9px] placeholder:font-[700] placeholder:leading-[11.52px] py-[15px] pl-4 text-[12px]"
                    style={{
                        border: "0.5px solid #D9D9D9",
                    }}
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
                    className="bg-[#202221] rounded-[8px] text-white placeholder:text-[#FFFFFF] placeholder:text-[9px] placeholder:font-[700] placeholder:leading-[11.52px] py-[15px] pl-4 text-[12px]"
                    style={{
                        border: "0.5px solid #D9D9D9",
                    }}
                    value={`https://t.me/hubic_ai_bot?start=${user?.username}`}
                />
                <button
                    className="flex justify-center items-center gap-2 bg-[#E879F9] rounded-[8px] py-[16px] text-white font-[700] text-[14px] leading-[11.52px] mt-2"
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
