import { FunctionComponent, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import useUser from "../hooks/useUser";
import { getTime } from "../services/movieService";
import {
    getMessagesByUserId,
    getUsersWhoMessagedAdmin,
    sendMessageToUser
} from "../services/chatService";
import { User } from "../interfaces/User";
import { Chat } from "../interfaces/Chat";
import EmojiPicker from 'emoji-picker-react';



const AdminChat: FunctionComponent = () => {
    const userData = useSelector((state: RootState) => state.usersState.currentUser);
    const { user } = useUser();
    const [isRefreshing, setIsRefreshing] = useState(false);
    const currentUserId = user?._id || userData?._id;
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [messages, setMessages] = useState<Chat[]>([]);
    const [input, setInput] = useState("");


    // emojis
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const emojiPickerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
                setShowEmojiPicker(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);



    const fetchUsers = async () => {
        try {
            const { data } = await getUsersWhoMessagedAdmin();
            setUsers(data);
        } catch (err) {
            console.error("⚠️ Failed to fetch users:", err);
        }
    };

    const fetchMessages = async (userId: string) => {
        try {
            const { data } = await getMessagesByUserId(userId);
            setMessages(data);
        } catch (err) {
            console.error("⚠️ Failed to fetch messages:", err);
        }
    };

    const sendMessage = async () => {
        if (!input.trim() || !selectedUser) return;

        try {
            await sendMessageToUser(input, selectedUser._id as string);
            setMessages((prev: any) => [
                ...prev,
                {
                    _id: Date.now().toString(),
                    text: input,
                    from: currentUserId || "",
                    to: selectedUser._id,
                    createdAt: new Date().toISOString(),
                },
            ]);
            setInput("");
        } catch (error) {
            console.error("❌ Failed to send message:", error);
        }
    };

    useEffect(() => {
        if (user?.isAdmin || userData?.isAdmin) {
            fetchUsers();
        }
    }, [user, userData, currentUserId]);

    useEffect(() => {
        if (selectedUser) {
            fetchMessages(selectedUser._id as string);
        }
    }, [selectedUser, currentUserId]);


    const handleRefresh = async () => {
        setIsRefreshing(true);
        try {
            await fetchUsers();
            if (selectedUser) {
                await fetchMessages(selectedUser._id as string);
            }
        } catch (err) {
            console.error("🔁 Refresh error:", err);
        } finally {
            setIsRefreshing(false);
        }
    };




    if (!user?.isAdmin && !userData?.isAdmin) return null;

    return (
        <section className="admin-chat-container">
            <div className="admin-chat">

                {/* sidebar */}
                <aside className="chat-sidebar">
                    <h5 className="px-2 pt-2">Chats</h5>
                    {users.map((u) => (
                        <div
                            key={u._id}
                            className={`user-preview ${selectedUser?._id === u._id ? "active" : ""}`}
                            onClick={() => setSelectedUser(u)}
                        >
                            <img src={u.image?.src || "/images/user.png"} alt={u.image?.alt || u.name} />
                            <span>{u.name}</span>
                        </div>
                    ))}
                </aside>

                <main className="chat-main">
                    {/* open chat */}
                    {selectedUser ? (
                        <>
                            <div className="chat-header d-flex justify-content-between align-items-center">
                                <h6 className="m-0">{selectedUser.name}</h6>
                                <button
                                    className="btn btn-sm btn-outline-secondary"
                                    onClick={handleRefresh}
                                    title="Refresh Chat"
                                    disabled={isRefreshing}
                                >
                                    <i className={`fa fa-refresh ${isRefreshing ? "spin" : ""}`}></i>
                                </button>
                            </div>


                            <div className="chat-messages">
                                {messages.length > 0 && messages.map((msg) => (
                                    <div


                                        key={msg._id}
                                        className={`chat-bubble ${msg.from._id === currentUserId ? "outgoing" : "incoming"}`}
                                    >
                                        <p>{msg.text}</p>
                                        <span className="timestamp">{getTime(new Date(msg.createdAt))}</span>
                                    </div>
                                ))}

                            </div>
                            <div className="chat-input position-relative">
                                <button
                                    className="emoji-toggle"
                                    type="button"
                                    onClick={() => setShowEmojiPicker((prev) => !prev)}
                                    title="Toggle Emoji Picker"
                                >
                                    😊
                                </button>

                                {showEmojiPicker && (
                                    <div style={{ position: 'absolute', bottom: '70px', left: "10px" }}>
                                        <EmojiPicker
                                            onEmojiClick={(emojiData) => setInput((prev) => prev + emojiData.emoji)}
                                        />
                                    </div>
                                )}
                                <input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                                    placeholder="Type a message..."
                                />
                                <button onClick={sendMessage}>
                                    <i className="fa fa-paper-plane"></i>
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="no-user-selected">Select a user to view messages</div>
                    )}
                </main>
            </div>
        </section>
    );
};

export default AdminChat;
