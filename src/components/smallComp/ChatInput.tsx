interface Props {
    input: string;
    setInput: (value: string) => void;
    onSend: () => void;
    disabled: boolean;
}

const ChatInput: React.FC<Props> = ({ input, setInput, onSend, disabled }) => {
    return (
        <div className="chat-input-area">
            <input
                type="text"
                className="chat-input"
                placeholder="Type a message"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={disabled}
            />
            <button className="chat-send-button" onClick={onSend} disabled={disabled}>
                Send
            </button>
        </div>
    );
};

export default ChatInput;
