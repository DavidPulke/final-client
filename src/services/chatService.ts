import axios from "axios"
import { errorMsg, successMsg } from "../tools/notifications/feedback";
import { User } from "../interfaces/User";
import { Chat } from "../interfaces/Chat";
const api = `${process.env.REACT_APP_API}messages`

export const sendToAdmin = async (text: string) => {
    try {
        const token = JSON.parse(localStorage.getItem("user") || "{}")?.token;
        const someId = "6851cf42d51fe176d3e531ac";

        await axios.post(api, {
            text,
            to: someId
        }, {
            headers: {
                Authorization: token
            }
        });

        successMsg("Message sent to admin");
    } catch (error) {
        errorMsg(`Error sending message to admin: ${error}`);
    }
};


export const sendMessageToUser = (text: string, to: string) => {
    const token = JSON.parse(localStorage.getItem("user") || "{}")?.token;
    return axios.post(
        `${api}`,
        { text, to },
        {
            headers: {
                Authorization: token,
            },
        }
    );
};



// קבלת ההודעות של המשתמש
export const getMyMessages = () => {
    const token = JSON.parse(localStorage.getItem("user") || "{}")?.token;
    return axios.get<Chat[]>(`${api}`, {
        headers: {
            Authorization: token
        }
    });
};

// קבלת כל המשתמשים ששלחו לאדמין
export const getUsersWhoMessagedAdmin = () => {
    const token = JSON.parse(localStorage.getItem("user") || "{}")?.token;
    return axios.get<User[]>(`${api}/users`, {
        headers: {
            Authorization: token
        }
    });
};

// קבלת הודעות לפי מזהה משתמש
export const getMessagesByUserId = (userId: string) => {
    const token = JSON.parse(localStorage.getItem("user") || "{}")?.token;
    return axios.get<Chat[]>(`${api}/${userId}`, {
        headers: {
            Authorization: token
        }
    });
};