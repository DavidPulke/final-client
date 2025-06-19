import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useUser from "../hooks/useUser";
import { RootState } from "../redux/store";

interface Message {
    text: string;
    sender: string;
    timeStamp: string;
}

export default function MiniChat() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState<string>("");
    const [suggestions, setSuggestions] = useState<string[]>([
        "How can i become a creator?",
        "How can i get more PulCoins?",
        "Can i watch the movie here?"
    ]);
    const userData = useSelector((state: RootState) => state.usersState.currentUser);
    const { user } = useUser()

    const answers = {
        howCreator: `If you want to join us as a creator, you need to:  
        \n 1. Upload a good quality movie with all the requirements.
        \n 2. Uploading your first movie will cost you 300 PulCoins.` ,


        howPulCoins: `For now its all free so you don't need any PulCoins but in the future To get more PulCoins, you will be able to complete tasks and earn PulCoins. \n `,

        howWatch: `Unfortunately, you cannot watch movies directly on our website due to copyright laws. However, you can find detailed information about movies, including trailers and where to watch them legally.`,
    }

    const toggleChat = () => setIsOpen(!isOpen);

    const sendMessage = (message?: string) => {
        const text = message || input.trim();
        if (text) {

            setMessages([...messages, { text, sender: "user", timeStamp: `${new Date().getHours()}:${String(new Date().getMinutes()).padStart(2, '0')}` }]);
            setInput("");
            switch (message) {
                // creator
                case "How can i become a creator?":
                    const indexOfCreator = suggestions.indexOf(message)
                    suggestions.splice(indexOfCreator, 1);
                    setTimeout(() => {
                        setMessages((prev) => [...prev, { text: answers.howCreator, sender: "PulkeMovies", timeStamp: `${new Date().getHours()}:${String(new Date().getMinutes()).padStart(2, '0')}` }]);
                    }, 500)
                    break;

                // PulCoins
                case "How can i get more PulCoins?":
                    const indexOfPulCoins = suggestions.indexOf(message)
                    suggestions.splice(indexOfPulCoins, 1);
                    setTimeout(() => {
                        setMessages((prev) => [...prev, { text: answers.howPulCoins, sender: "PulkeMovies", timeStamp: `${new Date().getHours()}:${String(new Date().getMinutes()).padStart(2, '0')}` }]);
                    }, 500)
                    break;

                // watch
                case "Can i watch the movie here?":
                    const indexOfWatch = suggestions.indexOf(message)
                    suggestions.splice(indexOfWatch, 1);
                    setTimeout(() => {
                        setMessages((prev) => [...prev, { text: answers.howWatch, sender: "PulkeMovies", timeStamp: `${new Date().getHours()}:${String(new Date().getMinutes()).padStart(2, '0')}` }]);
                    }, 500)
                    break;

                default:
                    break;
            }
        }
    };

    return (

        <div style={{ position: "fixed", bottom: "20px", left: "20px", zIndex: 50 }}>
            {isOpen && (
                <div className="card shadow-lg" style={{ width: "300px" }}>
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <h6 className="mb-0">Contact-Us</h6>
                        <button className="btn btn-light btn-sm" onClick={toggleChat}>
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                    <div className="card-body" style={{ height: "250px", overflowY: "auto" }}>
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`position-relative p-2 mb-2 rounded ${msg.sender === "user" ? "bg-primary text-white ms-auto" : "bg-light"}`}
                                style={{ maxWidth: "80%", whiteSpace: "pre-line" }}
                            >
                                {msg.sender === "user" &&
                                    <img className="user-chat-icon" src={user?.image?.src || userData?.image?.src || "images/manCoding.webp"} alt={user?.image?.alt || userData?.image?.alt || "Default Icon"} title={user?.image?.alt || userData?.image?.alt || "Default Icon"} />
                                }

                                <span className="timeStamp">{msg.timeStamp}</span>

                                {msg.text}
                                {msg.text === answers.howPulCoins && <Link to={"/market"}>Market</Link>}
                                {msg.text === answers.howCreator && <Link to={"/becomeCreator"}>Creator</Link>}
                            </div>

                        ))}
                    </div>
                    <div className="card-footer">
                        <div className="mb-2">
                            {suggestions.map((suggestion, index) => (
                                <button key={index} className="btn btn-outline-secondary btn-sm me-1" onClick={() => sendMessage(suggestion)}>
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type here..."
                                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                            />
                            <button disabled={messages.length > 0 && messages[messages.length - 1].sender !== "PulkeMovies"} className="btn btn-primary" onClick={() => sendMessage()}>Send</button>
                        </div>
                    </div>
                </div>
            )}
            <button
                className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: "50px", height: "50px", boxShadow: "0px 4px 6px rgba(0,0,0,0.1)" }}
                onClick={toggleChat}
            >
                <i className="fa-regular fa-comment-dots"></i>
            </button>
        </div>
    );
}