import axios from "axios"
const socketApi: string = `http://localhost:5000/api/chats`


export const getAllUsersWhoChatted = (adminId: string) => {
    const token = JSON.parse(localStorage.getItem("user") || "{}")?.token;
    return axios.get(`${socketApi}/${adminId}`, { headers: { Authorization: token } });
};

export const getMessagesBetweenUserAndAdmin = (userId: string, adminId: string) => {
    const token = JSON.parse(localStorage.getItem("user") || "{}")?.token;
    return axios.get(`${socketApi}/${userId}/${adminId}`, { headers: { Authorization: token } });
};
