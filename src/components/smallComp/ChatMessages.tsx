import { useRef, useEffect } from "react";

interface Message {
    from: string;
    text: string;
    timestamp: number;
}

interface Props {
    messages: Message[];
    adminId: string;
}

const ChatMessages: React.FC<Props> = ({ messages, adminId }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="chat-messages" ref={scrollRef}>
            {messages.map((m, i) => (
                <div key={i} className={`message ${m.from === adminId ? 'admin' : 'user'}`}>
                    <div>{m.text}</div>
                    <div className="message-time">
                        {new Date(m.timestamp).toLocaleTimeString()}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ChatMessages;
