import axios from "axios"
import { User, UserToEdit } from "../interfaces/User"
import { jwtDecode, JwtPayload } from "jwt-decode";
const api: string = `${process.env.REACT_APP_API}users`



// register
export function register(data: User) {
    return axios.post(api, data)
};

// login
export function login(data: { email: string, password: string }) {
    return axios.post(`${api}/login`, data)
};

// get all users
export function getAllUsers() {
    const token = JSON.parse(localStorage.getItem("user") || "{}")?.token;
    return axios.get(api, { headers: { Authorization: token } })
};


// get users by ids
export function getUsersByIds(ids: string[]) {
    return axios.post(`${api}/byIds`, { userIds: ids })
};

// get all creators
export function getCreators() {
    const token = JSON.parse(localStorage.getItem("user") || "{}")?.token;
    return axios.get(`${api}/creators`, { headers: { Authorization: token } })
};

// get a specific user
export function getUser(userId: string, token?: string) {
    const hardToken = JSON.parse(localStorage.getItem("user") || "{}")?.token;
    return axios.get(`${api}/${userId}`, {
        headers: {
            Authorization: token || hardToken
        }
    })
};

// get a specific user
export function getUserNoToken(userId: string) {
    return axios.get(`${api}/free/${userId}`)
};

// edit user
export function editUser(userId: string, data: UserToEdit) {
    const token = JSON.parse(localStorage.getItem("user") || "{}")?.token;
    return axios.put(`${api}/${userId}`, data, {
        headers: {
            Authorization: token
        }
    })
};



// image upload
export const imageHandler = (formData: FormData) => {
    const token = JSON.parse(localStorage.getItem("user") || "{}")?.token;

    return axios.post(`${api}/upload`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};


interface CustomDecoded extends JwtPayload {
    _id: string;
    isAdmin: boolean;
    isVerified: boolean;
    isCreator: boolean;
}

export const getUserDetails = async (token: string) => {
    try {
        let payload = jwtDecode<CustomDecoded>(token)
        let userId: string = payload._id
        return getUser(userId, token)
    } catch (error) {
        console.log(error);
    }
}


// local storage data
export const getStorageUser = () => JSON.parse(localStorage.getItem("user") || "{}");

export const setStorageUser = (data: any) => {
    localStorage.setItem("user", JSON.stringify(data));
};


// pay
export function pay(amount: number) {
    const token = JSON.parse(localStorage.getItem("user") || "{}")?.token;

    return axios.patch(`${api}/pay`, { amount }, {
        headers: {
            Authorization: token
        }
    })
};

