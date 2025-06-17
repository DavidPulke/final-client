import { useEffect, useState, useRef, FunctionComponent } from 'react';
import io, { Socket } from 'socket.io-client';
import { getAllUsersWhoChatted, getMessagesBetweenUserAndAdmin } from '../services/chatService';
import UserList from './smallComp/UserList';
import ChatHeader from './smallComp/ChatHeader';
import ChatMessages from './smallComp/ChatMessages';
import ChatInput from './smallComp/ChatInput';

interface AdminChatProps {
    adminId: string;
}

interface Message {
    from: string;
    text: string;
    timestamp: number;
}

interface User {
    id: string;
    name: string;
    avatar: string;
}

type MessagesMap = {
    [userId: string]: Message[];
};

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';

const AdminChat: FunctionComponent<AdminChatProps> = ({ adminId }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [messagesMap, setMessagesMap] = useState<MessagesMap>({});
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [input, setInput] = useState('');
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        const socket = io(SOCKET_URL);
        socketRef.current = socket;

        socket.on('connect', () => {
            console.log('🔌 Admin connected with id', socket.id);
            socket.emit('join', adminId);
        });

        socket.on('receive_message', ({ userId, message }: { userId: string; message: Message }) => {
            setMessagesMap(prev => ({
                ...prev,
                [userId]: [...(prev[userId] || []), message],
            }));
        });

        return () => {
            socket.disconnect();
        };
    }, [adminId]);

    useEffect(() => {
        getAllUsersWhoChatted(adminId)
            .then(res => {
                const formatted: User[] = res.data.map((u: any) => ({
                    id: u._id,
                    name: u.name,
                    avatar: u.image?.src || '/default-avatar.png',
                }));
                setUsers(formatted);
            })
            .catch(err => console.error('❌ Failed to load users:', err));
    }, [adminId]);

    useEffect(() => {
        if (!selectedUserId) return;

        getMessagesBetweenUserAndAdmin(selectedUserId, adminId)
            .then(res => {
                setMessagesMap(prev => ({
                    ...prev,
                    [selectedUserId]: res.data,
                }));
            })
            .catch(err => console.error('❌ Failed to fetch messages:', err));
    }, [selectedUserId, adminId]);

    const handleSend = () => {
        if (!input.trim() || !selectedUserId) return;

        const msg: Message = {
            from: adminId,
            text: input.trim(),
            timestamp: Date.now(),
        };

        socketRef.current?.emit('send_message', {
            userId: selectedUserId,
            message: msg,
        });

        setMessagesMap(prev => ({
            ...prev,
            [selectedUserId]: [...(prev[selectedUserId] || []), msg],
        }));

        setInput('');
    };

    return (
        <section className="chat-app">
            <UserList users={users} selectedUserId={selectedUserId} onSelect={setSelectedUserId} />
            <div className="chat-container">
                <ChatHeader users={users} selectedUserId={selectedUserId} />
                <ChatMessages messages={messagesMap[selectedUserId as any] || []} adminId={adminId} />
                <ChatInput
                    input={input}
                    setInput={setInput}
                    onSend={handleSend}
                    disabled={!selectedUserId}
                />
            </div>
        </section>
    );
};

export default AdminChat;
