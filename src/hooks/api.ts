import axios from "axios";

const base_url = "http://localhost:7001";
//const base_url = "https://firestarter.daeta.xyz";

export const getUserById = async (username: string) => {
    try {
        const { data } = await axios.post(`${base_url}/get-user`, {
            userid: username,
        });

        if (data) return data;
        else return null;
    } catch (error) {
        console.error("Fetching user data error: ", error);
        return null;
    }
};

export const getUserSpin = async (username: string) => {
    try {
        const res = await axios.post(`${base_url}/get-user-spin`, {
            userid: username
        })

        return res.data
    }
    catch(error) {
        console.error(error)
        return null
    }
}

export const getAllUsers = async () => {
    try {
        const { data } = await axios.get(`${base_url}/get-users`);

        if (data) return data;
        else return null;
    } catch (error) {
        console.error("Fetching all users error: ", error);
        return null;
    }
};

export const getAllQuests = async () => {
    try {
        const { data } = await axios.get(`${base_url}/get-quests`);

        if (data) return data;
        else return null;
    } catch (error) {
        console.error("Fetching all quests error: ", error);
        return null;
    }
};

export const completeQuest = async (username: string, questId: string) => {
    try {
        const response = await axios.post(`${base_url}/complete-quest`, {
            userid: username,
            questId: questId,
        });

        if (response.status === 200) return true;
        else return false;
    } catch (error) {
        console.error("Complete the Quest error: ", error);
        return false;
    }
};

export const getSpinPrize = async (username: string): Promise<{amount: number, index: number}> => {
    try {
        const res = await axios.post(`${base_url}/spin`, {
            userid: username
        })

        return res.data
    }
    catch(error) {
        console.error(error)
        throw error
    }
}

export const getUserQuests = async (userid: string, usertime: number) => {
    try {
        const res = await axios.post(`${base_url}/get-quests`, {
            userid,
            usertime
        })

        return res.data
    }
    catch(error) {
        console.error(error)
        throw error
    }
}

export const joinTelegramQuestComplete = async (userid: string) => {
    try {
        const res = await axios.post(`${base_url}/join-telegram`, {
            userid
        })

        return res.data
    }
    catch(error) {
        console.error(error)
        throw error
    }
}

export const followXQuestComplete = async (userid: string) => {
    try {
        const res = await axios.post(`${base_url}/follow-x`, {
            userid
        })

        return res.data
    }
    catch(error) {
        console.error(error)
        throw error
    }
}

export const postXQuestComplete = async (userid: string, usertime: number) => {
    try {
        const res = await axios.post(`${base_url}/post-x`, {
            userid,
            usertime
        })

        return res.data
    }
    catch(error) {
        console.error(error)
        throw error
    }
}