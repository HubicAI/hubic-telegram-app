import { createContext, ReactNode, useContext, useState } from "react";
import { SnackbarProvider } from 'notistack';
import {
    completeQuest,
    getAllQuests,
    getAllUsers,
    getUserById,
} from "../hooks/api";

interface IUser {
    _id: string;
    username: string;
    points: number;
    otp: string;
}

interface IWhoDone {
    user: string;
    timestamp: string;
}

interface IQuest {
    _id: string;
    type: string;
    title: string;
    description: string;
    link: string;
    points: number;
    isOt: boolean;
    who_done: IWhoDone[];
}

interface IProvider {
    loading: boolean;
    user: IUser | null;
    users: IUser[] | null;
    quests: IQuest[] | null;
    getUser: (username: string) => Promise<void>;
    getUsers: () => Promise<void>;
    getQuests: () => Promise<void>;
    completeQuestHook: (username: string, questId: string) => Promise<void>;
}

export const AppContext = createContext<IProvider | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [users, setUsers] = useState<IUser[] | null>(null);
    const [quests, setQuests] = useState<IQuest[] | null>(null);

    const getUser = async (username: string) => {
        if (!username) return;

        const userInfo = await getUserById(username);
        setUser(userInfo);
    };

    const getUsers = async () => {
        const usersData = await getAllUsers();
        setUsers(usersData);
    };

    const getQuests = async () => {
        const questsData = await getAllQuests();
        setQuests(questsData);
    };

    const completeQuestHook = async (username: string, questId: string) => {
        if (!username || !questId) return;

        const isSuccess = await completeQuest(username, questId);
        if (isSuccess) {
            getUser(username);
            getUsers();
            getQuests();
        }
    };

    return (
        <AppContext.Provider
            value={{
                loading: false,
                user,
                users,
                quests,
                getUser,
                getUsers,
                getQuests,
                completeQuestHook,
            }}
        >
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
