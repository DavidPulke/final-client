import { FunctionComponent, useEffect, useRef, useState } from "react";
import { commentMovie, getMovie, getTime } from "../../services/movieService";
import { Comment } from "../../interfaces/Movie";
import { getUsersByIds } from "../../services/userService";
import { User } from "../../interfaces/User";

interface CommentsProps {
    movieId: string;
    user: User;
    userData: any;
}

const Comments: FunctionComponent<CommentsProps> = ({ movieId, user, userData }) => {

    const messageRef = useRef<HTMLTextAreaElement>(null);
    const [charCount, setCharCount] = useState(0);
    const [userMap, setUserMap] = useState<Record<string, any>>({});
    let [comments, setComments] = useState<Comment[]>([]);




    useEffect(() => {
        getMovie(movieId).then((res: any) => {
            setComments(res.data.comments)
        }).catch((err) => {
            console.log(err);
        })
    }, [movieId]);

    const handleInput = () => {
        if (messageRef.current) {
            setCharCount(messageRef.current.value.length);
        }
    };

    useEffect(() => {
        const uniqueUserIds = Array.from(new Set(comments.map(c => c.userId)));

        getUsersByIds(uniqueUserIds)
            .then(res => {
                const map: { [key: string]: User } = {};
                res.data.forEach((user: User) => {
                    if (user._id) {
                        map[user._id] = user;
                    }
                });
                setUserMap(map);
            })
            .catch(err => console.error(err));
    }, [comments]);


    const handleSendComment = async () => {
        const message = messageRef.current?.value?.trim();
        if (!message) return;

        try {
            await commentMovie(movieId, user?._id as string, message);
            // instent update 
            setComments((prev: any) => [{
                userId: user?._id as string,
                message,
                time: new Date(),
                token: JSON.parse(localStorage.getItem("user") || "{}")?.token
                , animation: true
            }, ...prev]);
            // init textarea
            if (messageRef.current) {
                setCharCount(0)
                messageRef.current.value = ""
            };


            // End the animation after 200ms
            setTimeout(() => {
                setComments(prev => prev.map((c, i) => i === 0 ? { ...c, animation: false } : c));
            }, 200);
        } catch (err) {
            console.error(err);
        }
    };




    return (<section id="movieComments">
        <h5 className="comments-amount">{comments.length} Comments</h5>
        <div className="user-input">
            <img src={user?.image?.src || "images/manCoding.webp"} alt={user?.image?.alt || "Default Logo"} />
            <textarea className="comment-user" name="comment" id="commentInput" maxLength={80} ref={messageRef} onInput={handleInput} placeholder={!user && !userData ? "Login to comment on this movie!" : ""} />
            <div className="message-cap"> <button onClick={handleSendComment} disabled={(!user && !userData) || messageRef.current?.value === ""} title={!user && !userData ? "Please login" : ""}><i className="fa-solid fa-paper-plane text-primary"></i></button>
                <span className={charCount > 70 && charCount < 80 ? "text-warning" : charCount === 80 ? " text-danger" : ""}>{charCount}/80</span></div>

        </div>

        {comments.length > 0 && comments.map((comment: Comment) => {

            const user = userMap[comment.userId];

            return <div className="comments" key={comment.userId + comment.time}>
                <div className={`comment ${comment.animation ? "entering" : ""}`}>
                    <img src={user?.image?.src || "images/manCoding.webp"} alt={user?.image?.alt || "Default Logo"} />
                    <div className="user-comment-info">
                        <span className="name">{user?.name}</span>
                        <span className="time">{getTime(comment.time)}</span>
                    </div>

                    <span className="message">{comment.message}</span>
                </div>
            </div>

        })}
    </section>);
}

export default Comments;