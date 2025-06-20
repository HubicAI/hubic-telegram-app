import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SnackbarProvider } from 'notistack';
import { ToastContainer } from "react-toastify";
import {
    completeQuest,
    getAllQuests,
    getAllUsers,
    getUserById,
    getUserSpin,
    getUserQuests
} from "../hooks/api";

interface IQuest {
    completed: boolean;
    daily: boolean;
    completedDay: number;
}

interface IQuests {
    joinTelegramQuest: IQuest;
    activeTelegramQuest: IQuest;
    followXQuest: IQuest;
    referFriendQuest: IQuest;
    postXQuest: IQuest;
}

interface IUser {
    _id: string;
    username: string;
    points: number;
    otp: string;
}

interface IUserSpin {
    count: number;
    unlockDuration: number;
    lastUpdateTime: number;
}

interface IProvider {
    loading: boolean;
    user: IUser | null;
    users: IUser[] | null;
    quests: IQuests | null;
    userSpin: IUserSpin | null;
    getUser: (username: string) => Promise<void>;
    getUsers: () => Promise<void>;
    getQuests: (username: string, usertimestamp: number) => Promise<void>;
    completeQuestHook: (username: string, questId: string) => Promise<void>;
    getUserSpinData: (username: string) => Promise<void>
}

export const AppContext = createContext<IProvider | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [searchParams] = useSearchParams();
    const userQueryParam = searchParams.get("user");

    const [user, setUser] = useState<IUser | null>(null);
    const [userSpin, setUserSpin] = useState<IUserSpin | null>(null);
    const [users, setUsers] = useState<IUser[] | null>(null);
    const [quests, setQuests] = useState<IQuests | null>(null);

    const getUser = async (username: string) => {
        if (!username) return;

        const userInfo = await getUserById(username);
        setUser(userInfo);
    };

    const getUsers = async () => {
        const usersData = await getAllUsers();
        setUsers(usersData);
    };

    const getQuests = async (username: string, usertimestamp: number) => {
        try {
            const questsData = await getUserQuests(username, usertimestamp);
            setQuests(questsData);
        }
        catch(error) {
            throw error
        }
    };

    const getUserSpinData = async (username: string) => {
        const userSpin = await getUserSpin(username)
        setUserSpin(userSpin)

    }

    const completeQuestHook = async (username: string, questId: string) => {
        if (!username || !questId) return;

        try {
            const isSuccess = await completeQuest(username, questId);
            if (isSuccess) {
                await getUser(username);
                await getUsers();
                await getQuests(username, Date.now());
            }
        }
        catch(error) {
            console.error(error)
        }
    };

    useEffect(() => {
        (async () => {
            if (!!!userQueryParam) return;
            try {
                await getUser(localStorage.getItem(userQueryParam) as string);
                await getUsers()
            }
            catch(error) {
                console.error(error)
            }
        })()
    }, [])

    useEffect(() => {
        (async () => {
            if(user && user.username) {
                try {
                    await getQuests(user.username, Date.now())
                }
                catch(error) {
                    console.error(error)
                }
            }
        })()
    }, [user])

    return (
        <AppContext.Provider
            value={{
                loading: false,
                user,
                users,
                quests,
                userSpin,
                getUser,
                getUserSpinData,
                getUsers,
                getQuests,
                completeQuestHook,
            }}
        >
            <ToastContainer position="top-center" theme="dark" />
            <SnackbarProvider maxSnack={3}>
                {children}
            </SnackbarProvider>
        </AppContext.Provider>
    );
};

export const useProvider = () => {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error("useProvider must be used within a AppProvider");
    }

    return context;
};
