import { FunctionComponent, useRef, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { User } from "../../interfaces/User";
import { deleteUser } from "../../services/userService";
import { successMsg } from "../../tools/notifications/feedback";

interface SearchUsersProps {
    users: User[]
}

const SearchUsers: FunctionComponent<SearchUsersProps> = ({ users }) => {
    const search = useRef<HTMLInputElement>(null);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [open, setOpen] = useState<boolean>(false)
    const navigate: NavigateFunction = useNavigate()
    const [refresh, setRefresh] = useState<boolean>(false);



    const handleSearch = () => {
        const query = search.current?.value.toLowerCase() || "";
        const results = users.filter((user) =>
            user.name.toLowerCase().includes(query)
        );
        setFilteredUsers(results);
    };

    // delete
    const handleDelete = async (userId: string, userName: string) => {
        try {
            const confirm = window.confirm("By accepting you will delete this user permenently are you sure you want to that?")
            if (confirm) {
                const res = await deleteUser(userId)
                successMsg(`${userName} as been deleted successfuly`)
                setRefresh(!refresh)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={`search-wraper users-search ${open ? "open" : ""}`}>
            <form className="search" onSubmit={(e) => e.preventDefault()}>
                <input
                    type="search"
                    placeholder="Search..."
                    ref={search}
                    onChange={handleSearch}
                />
                <i onClick={() => setOpen(!open)} className="fa-solid fa-magnifying-glass"></i>
            </form>
            {search.current?.value.length && search.current?.value.length >= 1 ? <section className="movies-list">
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((user: User) => (
                        <div className="user-card mb-3" key={user._id}>
                            <img src={user.image?.src || "/images/manCoding.webp"} alt={user.image?.alt} />
                            <div className="user-data">
                                <h4><strong>Name: </strong>{user.name}</h4>
                                <h4><strong>Email: </strong>{user.email}</h4>
                                <h4><strong>Creator: </strong>{user.isCreator ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-xmark"></i>}</h4>
                            </div>
                            <div className="flex">
                                {/* delete */}
                                <i onClick={() => handleDelete(user._id as string, user.name)} className="fa-solid fa-trash text-danger"></i>

                                {/* edit */}
                                <i onClick={() => navigate(`/editUser/${user._id}`)} className="fa-solid fa-pen text-warning"></i>
                            </div>

                        </div>
                    ))
                ) : (
                    <p>No users found</p>
                )}
            </section> : <></>}

        </div>
    );
};

export default SearchUsers;
