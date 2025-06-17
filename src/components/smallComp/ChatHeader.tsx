interface User {
    id: string;
    name: string;
}

interface Props {
    users: User[];
    selectedUserId: string | null;
}

const ChatHeader: React.FC<Props> = ({ users, selectedUserId }) => {
    const selectedUser = users.find(u => u.id === selectedUserId);
    return (
        <div className="chat-header">
            {selectedUser ? selectedUser.name : 'Admin Chat'}
        </div>
    );
};

export default ChatHeader;
