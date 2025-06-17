interface User {
    id: string;
    name: string;
    avatar?: string;
}

interface Props {
    users: User[];
    selectedUserId: string | null;
    onSelect: (id: string) => void;
}

const UserList: React.FC<Props> = ({ users, selectedUserId, onSelect }) => {
    return (
        <div className="user-list">
            {users.map(user => (
                <div
                    key={user.id}
                    className={`user-item ${selectedUserId === user.id ? 'active' : ''}`}
                    onClick={() => onSelect(user.id)}
                >
                    <img src={user.avatar} alt={user.name} className="avatar" />
                    <span className="username">{user.name}</span>
                </div>
            ))}
        </div>
    );
};

export default UserList;
