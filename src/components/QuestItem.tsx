import type { FC } from "react";
import { useProvider } from "../provider/AppProvider";
import { useSnackbar } from "notistack";
import ArrowSvg from "../assets/arrow.svg";

interface QuestItemProps {
    _id: string;
    type: string;
    title: string;
    description: string;
    link: string;
    isActive: boolean;
    price: number;
    isDaily: boolean;
}

const QuestItem: FC<QuestItemProps> = ({
    type,
    title,
    description,
    link,
    price,
    isActive,
    isDaily,
    _id,
}) => {
    const { completeQuestHook } = useProvider();
    const { enqueueSnackbar } = useSnackbar();

    const handleComplete = async (id: string) => {
        const userId = localStorage.getItem("userid");

        if (!userId) {
            enqueueSnackbar("Please connect your wallet first", {
                variant: "warning",
                anchorOrigin: { vertical: "top", horizontal: "right" },
            });
            return;
        }

        if (isActive) {
            enqueueSnackbar(
                isDaily
                    ? "You've already completed this daily quest today"
                    : "You've already completed this quest",
                {
                    variant: "warning",
                    anchorOrigin: { vertical: "top", horizontal: "right" },
                }
            );
            return;
        }

        try {
            // Handle referral type differently
            if (type.toLowerCase() === "refer") {
                const botUsername = "hubic_ai_bot"; // Replace with your actual bot username
                const referralLink = `https://t.me/${botUsername}?start=${userId}`;

                // Open Telegram share dialog
                const shareText = encodeURIComponent(`Check this out!\n\nDÆTA launched the LVRG Firestarter Whitelist app.\n\nJoin by using my referral link:`);
                const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${shareText}`;

                window.open(telegramShareUrl, "_blank");
            } else if (link) {
                window.open(link, "_blank");
                enqueueSnackbar("Quest completion in progress...", {
                    variant: "info",
                    anchorOrigin: { vertical: "top", horizontal: "right" },
                });

                // Update Database in 5 secs
                setTimeout(async () => {
                    try {
                        await completeQuestHook(userId, id);
                        enqueueSnackbar(`Successfully completed quest: ${title}`, {
                            variant: "success",
                            anchorOrigin: { vertical: "top", horizontal: "right" },
                        });
                    } catch (error) {
                        enqueueSnackbar(
                            error instanceof Error
                                ? error.message
                                : "Failed to complete quest",
                            {
                                variant: "error",
                                anchorOrigin: { vertical: "top", horizontal: "right" },
                            }
                        );
                    }
                }, 5000);
            }
            // Show pending notification
        } catch (error) {
            enqueueSnackbar(
                error instanceof Error
                    ? error.message
                    : "Failed to process quest",
                {
                    variant: "error",
                    anchorOrigin: { vertical: "top", horizontal: "right" },
                }
            );
        }
    };

    return (
        <div
            className="flex rounded-[8px] w-full h-fit p-[15px] justify-between cursor-pointer hover:opacity-90 transition-opacity"
            style={{
                border: "0.5px solid #D9D9D9",
            }}
            onClick={() => handleComplete(_id)}
        >
            <div className="flex flex-col gap-1">
                <p className="font-[400] text-[10px] leading-[12.8px] text-[#E0DECF]">
                    {isDaily ? "Daily Quest" : type}
                </p>
                <p className="font-[700] text-[12px] leading-[15.36px] text-[#E879F9]">
                    {title}
                </p>
                <p className="flex justify-center items-center font-[700] text-[10px] leading-[15.36px] text-[#D9D9D9]">
                    <span>{description}</span>
                    {/*<img src={ArrowSvg} alt="arrow Img" className="pl-1" />*/}
                </p>
            </div>
            <span className="text-[14px] text-[#01F079] font-[700] leading-[17.92px]">
                {isActive ? "Done" : <>+{price}</>}
            </span>
        </div>
    );
};

export default QuestItem;