import { useEffect, type FC } from "react";
import Breadcrumb from "../components/Breadcrumb";
import { useProvider } from "../provider/AppProvider";
import { formatNumber } from "../utils/formatNumber";
import Rank from "../assets/rank.png";

interface LeaderboardProps { }

const Leaderboard: FC<LeaderboardProps> = () => {
    const { user, getUser, users, getUsers } = useProvider();

    useEffect(() => {
        if (!localStorage.getItem("userid")) return;

        getUser(localStorage.getItem("userid") as string);
        getUsers();
    }, []);

    // Calculate user's rank
    const getUserRank = () => {
        if (!user || !users || users.length === 0) return "N/A";

        const userIndex = users.findIndex((u) => u.username === user.username);
        if (userIndex === -1) {
            return "100+";
        }
        return `#${userIndex + 1}`;
    };

    let rankContent;
    if (users && users.length > 0) {
        rankContent = users.map((user, idx) => (
            <tr key={idx} className="h-[28px]">
                <td>#{idx + 1}</td>
                <td>{user.username}</td>
                <td>{formatNumber(user.points)}</td>
            </tr>
        ));
    }

    return (
        <>
            <Breadcrumb
                title="Leaderboard"
                description="How to collect Firestarter points?"
            />

            <div
                className="rounded-[8px] h-[179px] w-full relative bg-[#202221]"
                style={{ border: "0.6px solid #D9D9D9" }}
            >
                <div className="grid grid-cols-3 justify-center items-center px-[5%]">
                    <div className="flex flex-col relative justify-center items-center top-[42%] z-10">
                        <p className="text-[8px] font-[700] leading-[10.24px] text-[#039CF3]">
                            {users && users[1] && users[1].username}
                        </p>
                        <p className="text-[19px] leading-[31px] font-[700] text-[#039CF3]">
                            {users && users[1] && formatNumber(users[1].points)}
                        </p>
                        <div
                            className="flex items-center justify-center rounded-full w-[47px] h-[47px]"
                            style={{ border: "1px solid #039CF3" }}
                        >
                            <p className="text-[#039CF3] font-bold">2</p>
                        </div>
                    </div>
                    <div className="flex flex-col relative justify-center items-center top-[30%] z-10">
                        <p className="text-[8px] font-[700] leading-[10.24px] text-[#FF6A3C]">
                            {users && users[0] && users[0].username}
                        </p>
                        <p className="text-[19px] leading-[31px] font-[700] text-[#FF6A3C]">
                            {users && users[0] && formatNumber(users[0].points)}
                        </p>
                        <div
                            className="flex items-center justify-center rounded-full w-[47px] h-[47px]"
                            style={{ border: "1px solid #FF6A3C" }}
                        >
                            <p className="text-[#FF6A3C] font-bold">1</p>
                        </div>
                    </div>
                    <div className="flex flex-col relative justify-center items-center top-[50%] z-10">
                        <p className="text-[8px] font-[700] leading-[10.24px] text-[#01F079]">
                            {users && users[2] && users[2].username}
                        </p>
                        <p className="text-[19px] leading-[31px] font-[700] text-[#01F079]">
                            {users && users[2] && formatNumber(users[2].points)}
                        </p>
                        <div
                            className="flex items-center justify-center rounded-full w-[47px] h-[47px]"
                            style={{ border: "1px solid #01F079" }}
                        >
                            <p className="text-[#01F079] font-bold">3</p>
                        </div>
                    </div>
                </div>
                <img
                    src={Rank}
                    alt="Rank Img"
                    className="w-full h-[54.75px] rounded-b-[8px] bottom-0 absolute left-0 z-0"
                />
            </div>

            <div
                className="w-full h-[78px] rounded-[8px] p-[13px] flex flex-col gap-1"
                style={{ border: "0.5px solid #D9D9D9" }}
            >
                <p className="text-[33px] leading-[31px] font-[700] text-[#E879F9]">
                    {getUserRank()}
                </p>
                <p className="font-[700] text-[12px] leading-[15.36px] text-[#D9D9D9]">
                    Your Place
                </p>
            </div>

            <div
                className="w-full h-[78px] rounded-[8px] p-[13px] flex flex-col gap-1"
                style={{ border: "0.5px solid #D9D9D9" }}
            >
                <p className="text-[33px] leading-[31px] font-[700] text-[#E879F9]">
                    {formatNumber(Number(user?.points))}
                </p>
                <p className="font-[700] text-[12px] leading-[15.36px] text-[#D9D9D9]">
                    Your Points
                </p>
            </div>

            {/* <div
                className="w-full h-[78px] rounded-[8px] p-[13px] flex flex-col gap-1"
                style={{ border: "0.5px solid #D9D9D9" }}
            >
                <p className="text-[33px] leading-[31px] font-[700] text-[#E879F9]">
                    {user && user.otp ? user.otp : "N/A"}
                </p>
                <p className="font-[700] text-[12px] leading-[15.36px] text-[#D9D9D9]">
                    Your OTP for DÆTA plugin
                </p>
            </div> */}

            <table
                className="w-full table-auto rounded-[8px]"
                style={{
                    border: "0.5px solid #D9D9D9",
                    borderCollapse: "separate",
                }}
            >
                <thead className="bg-[#2B2D2C] border-b-[0.5px] border-b-[#D9D9D9] text-[8px] font-[700] text-[#E879F9] w-full h-[25px] rounded-t-[8px]">
                    <tr>
                        <th>#</th>
                        <th>User</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody className="text-[8px] font-[700] text-[#D9D9D9] leading-[10.24px] text-center">
                    {rankContent}
                </tbody>
            </table>
            <div className="pb-20"></div>
        </>
    );
};

export default Leaderboard;