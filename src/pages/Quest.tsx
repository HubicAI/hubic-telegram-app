import { useEffect, type FC } from "react";
import { useProvider } from "../provider/AppProvider";
import Breadcrumb from "../components/Breadcrumb";
import QuestItem from "../components/QuestItem";

interface QuestProps { }

const Quest: FC<QuestProps> = () => {
    const { user, quests, getUser, getQuests } = useProvider();

    useEffect(() => {
        if (!localStorage.getItem("userid")) return;
        getUser(localStorage.getItem("userid") as string);
        getQuests();
    }, []);

    let questsContent;
    if (quests && quests.length > 0) {
        questsContent = quests.map((quest, idx) => {
            const isDaily = quest.type.toLowerCase().includes('daily');

            let isActive = false;
            if (isDaily) {
                // Check if claimed today
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                isActive = quest.who_done?.some(claim =>
                    claim.user === user?._id &&
                    new Date(claim.timestamp).setHours(0, 0, 0, 0) === today.getTime()
                );
            } else {
                // Regular one-time quest
                isActive = quest.isOt && quest.who_done?.some(claim => claim.user === user?._id);
            }

            return (
                <QuestItem
                    key={idx}
                    _id={quest._id}
                    type={quest.type}
                    title={quest.title}
                    description={quest.description}
                    link={quest.link}
                    isActive={isActive}
                    price={quest.points}
                    isDaily={isDaily}
                />
            );
        });
    }

    return (
        <>
            <Breadcrumb
                title="Quest"
                description="Earn Firestarter points by completing quests"
            />

            <div className="mt-6 flex gap-2 font-[700] text-[12px] leading-[15.36px] items-center">
                <span className="text-[#FFFFFF]">Earned Firestarter points:</span>
                <span className="text-[#E879F9] text-lg">{user ? user.points : 0}</span>
            </div>

            <div className="quest-board flex flex-col gap-3 pb-20">
                {questsContent}
            </div>
        </>
    );
};

export default Quest;
