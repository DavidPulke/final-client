import { useEffect, useState } from "react";
import { User } from "../interfaces/User";
import { getStorageUser, getUser, getUserDetails } from "../services/userService";

const useUser = () => {
    const [user, setUser] = useState<User>();
    const [refresh, setRefresh] = useState<boolean>(false);
    const storageUser = getStorageUser();

    useEffect(() => {
        if (localStorage.user) {
            if (storageUser) {
                getUserDetails(storageUser.token).then((res: any) => setUser(res.data)).catch((err) => console.log(err))
            }
        }
    }, [refresh]);








    return { user, setUser, setRefresh, refresh };
};

export default useUser;
