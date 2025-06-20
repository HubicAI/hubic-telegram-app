import { useEffect, type FC } from "react";
import { useProvider } from "../provider/AppProvider";
import Breadcrumb from "../components/Breadcrumb";
import { toast } from "react-toastify";

import { 
    joinTelegramQuestComplete,
    followXQuestComplete,
    postXQuestComplete
} from "../hooks/api";

// ** import icons
import { FaStar, FaRegCheckCircle, FaExternalLinkAlt, FaRegCopy } from "react-icons/fa";

// ** re-defind icon type
const FaStarIcon = FaStar as React.FC<{ color: string; size: number }>;
const FaExternalLinkAltIcon = FaExternalLinkAlt as React.FC<{ color: string; size: number }>;
const FaRegCheckCircleIcon = FaRegCheckCircle as React.FC<{ color: string; size: number }>;
const FaRegCopyIcon = FaRegCopy as React.FC<{ color: string; size: number }>;

interface QuestProps { }

const QuestSuccess = () => {
    return (
        <div className="flex absolute top-0 left-0 w-full h-full justify-center items-center backdrop-blur-sm">
            <FaRegCheckCircleIcon color="#4BB543" size={80} />
        </div>
    )
}

const Quest: FC<QuestProps> = () => {
    const { user, quests, getUser, getQuests } = useProvider();

    const handleJoinTelegram = async () => {
        try {
            const res = await joinTelegramQuestComplete(user?.username || "")
            console.log(res)

            await getQuests(user?.username || "", Date.now())
        }
        catch(error) {
            console.error(error)
        }
    }

    const handleFollowX = async () => {
        try {
            const res = await followXQuestComplete(user?.username || "")
            console.log(res)

            await getQuests(user?.username || "", Date.now())
        }
        catch(error) {
            console.error(error)
        }
    }

    const handleReferFriend = async () => {
        try {
            await navigator.clipboard.writeText(`https://t.me/hubic_ai_bot?start=${user?.username}`)
            toast("Your referral link copied")
        }
        catch(error) {
            console.error(error)
        }
    }

    const handlePostX = async () => {
        try {
            const res = await postXQuestComplete(user?.username || "", Date.now())
            console.log(res)

            await getQuests(user?.username || "", Date.now())
        }
        catch(error) {
            console.error(error)
        }
    }

    useEffect(() => {
        (async () => {
            try {
                if (!localStorage.getItem("userid")) return;
                await getUser(localStorage.getItem("userid") as string);
            }
            catch (error) {
                console.error(error)
            }
        })()
    }, []);

    useEffect(() => {
        (async () => {
            if (user && user.username) {
                try {
                    await getQuests(user.username, Date.now());
                }
                catch (error) {
                    console.error(error)
                }
            }
        })()
    }, [user])

    return (
        <>
            <Breadcrumb
                title="Quest"
                description="Earn Firestarter points by completing quests"
            />

            <div className="mt-6 flex gap-1 font-[700] text-[12px] leading-[15.36px] items-center py-5">
                <h1 className="text-[#FFFFFF] text-base">Earned Firestarter points:</h1>
                <span className="text-[#E879F9] text-lg">{user ? user.points : 0}</span>
            </div>

            <div className="quest-board flex flex-col gap-2 pb-20">
                {/* Start Quest1: Join Telegram */}
                <div className="flex flex-col relative bg-white bg-opacity-20 backdrop-blur-[1px] rounded-lg p-4 border-solid border-[1px] border-[#E879F9] border-opacity-50">
                    {
                        quests?.joinTelegramQuest.completed ? <QuestSuccess /> : <></>
                    }
                    <div className="flex justify-between">
                        <h1 className="flex text-[#E879F9] font-bold">Join Telegram</h1>
                        <div className="flex items-end gap-1">
                            <h1 className="flex text-white font-semibold">+ 10000</h1>
                            <FaStarIcon size={25} color="#FFD700" />
                        </div>
                    </div>
                    <div className="flex">
                        <h1 className="flex text-[#E879F9] opacity-80">Social</h1>
                    </div>
                    <div className="flex justify-between items-center">
                        <h1 className="flex text-white text-[14px] w-[250px] break-words">Join our Telegram official group and earn Farming points</h1>
                        <a onClick={handleJoinTelegram} href="https://t.me/Hubic_ai" target="_blank" rel="noopener" >
                            <FaExternalLinkAltIcon size={20} color="#E879F9" />
                        </a>
                    </div>
                </div>
                {/* End Quest1 */}

                {/* Start Quest2: Active on Telegram */}
                <div className="flex flex-col relative bg-white bg-opacity-20 backdrop-blur-[1px] rounded-lg p-4 border-solid border-[1px] border-[#E879F9] border-opacity-50">
                    {
                        quests?.activeTelegramQuest.completed ? <QuestSuccess /> : <></>
                    }
                    <div className="flex justify-between">
                        <h1 className="flex text-[#E879F9] font-bold">Active on Telegram</h1>
                        <div className="flex items-end gap-1">
                            <h1 className="flex text-white font-semibold">+ 5000</h1>
                            <FaStarIcon size={25} color="#FFD700" />
                        </div>
                    </div>
                    <div className="flex">
                        <h1 className="flex text-[#E879F9] opacity-80">Social</h1>
                    </div>
                    <div className="flex justify-between items-center">
                        <h1 className="flex text-white text-[14px] w-[250px] break-words">Be active on telegram group chat daily</h1>
                        <a href="https://t.me/Hubic_ai" target="_blank" rel="noopener">
                            <FaExternalLinkAltIcon size={20} color="#E879F9" />
                        </a>
                    </div>
                </div>
                {/* End Quest2 */}

                {/* Start Quest3: Follow on X */}
                <div className="flex flex-col relative bg-white bg-opacity-20 backdrop-blur-[1px] rounded-lg p-4 border-solid border-[1px] border-[#E879F9] border-opacity-50">
                    {
                        quests?.followXQuest.completed ? <QuestSuccess /> : <></>
                    }
                    <div className="flex justify-between">
                        <h1 className="flex text-[#E879F9] font-bold">Follow us on X</h1>
                        <div className="flex items-end gap-1">
                            <h1 className="flex text-white font-semibold">+ 10000</h1>
                            <FaStarIcon size={25} color="#FFD700" />
                        </div>
                    </div>
                    <div className="flex">
                        <h1 className="flex text-[#E879F9] opacity-80">Social</h1>
                    </div>
                    <div className="flex justify-between items-center">
                        <h1 className="flex text-white text-[14px] w-[250px] break-words">Follow ux on X and earn extra points</h1>
                        <a onClick={handleFollowX} href="https://x.com/Hubic_Ai" target="_blank" rel="noopener">
                            <FaExternalLinkAltIcon size={20} color="#E879F9" />
                        </a>
                    </div>
                </div>
                {/* End Quest3 */}

                {/* Start Quest4: Refer a friend */}
                <div className="flex flex-col relative bg-white bg-opacity-20 backdrop-blur-[1px] rounded-lg p-4 border-solid border-[1px] border-[#E879F9] border-opacity-50">
                    {
                        quests?.referFriendQuest.completed ? <QuestSuccess /> : <></>
                    }
                    <div className="flex justify-between">
                        <h1 className="flex text-[#E879F9] font-bold">Refer a friend</h1>
                        <div className="flex items-end gap-1">
                            <h1 className="flex text-white font-semibold">+ 20000</h1>
                            <FaStarIcon size={25} color="#FFD700" />
                        </div>
                    </div>
                    <div className="flex">
                        <h1 className="flex text-[#E879F9] opacity-80">Social</h1>
                    </div>
                    <div className="flex justify-between items-center">
                        <h1 className="flex text-white text-[14px] w-[250px] break-words">Refer a friend and earn extra points</h1>
                        <button className="flex" onClick={handleReferFriend}>
                            <FaRegCopyIcon size={20} color="#E879F9" />
                        </button>
                    </div>
                </div>
                {/* End Quest4 */}

                {/* Start Quest5: Post on X */}
                <div className="flex flex-col relative bg-white bg-opacity-20 backdrop-blur-[1px] rounded-lg p-4 border-solid border-[1px] border-[#E879F9] border-opacity-50">
                    {
                        quests?.postXQuest.completed ? <QuestSuccess /> : <></>
                    }
                    <div className="flex justify-between">
                        <h1 className="flex text-[#E879F9] font-bold">Post on X</h1>
                        <div className="flex items-end gap-1">
                            <h1 className="flex text-white font-semibold">+ 10000</h1>
                            <FaStarIcon size={25} color="#FFD700" />
                        </div>
                    </div>
                    <div className="flex">
                        <h1 className="flex text-[#E879F9] opacity-80">Social</h1>
                    </div>
                    <div className="flex justify-between items-center">
                        <h1 className="flex text-white text-[14px] w-[250px] break-words">Post on X about Hubic daily use our tag</h1>
                        <a onClick={handlePostX} href="https://x.com/Hubic_Ai" target="_blank" rel="noopener">
                            <FaExternalLinkAltIcon size={20} color="#E879F9" />
                        </a>
                    </div>
                </div>
                {/* End Quest5 */}
            </div>
        </>
    );
};

export default Quest;
