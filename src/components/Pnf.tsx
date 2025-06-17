import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";

interface PageNotFoundProps { }

const PageNotFound: FunctionComponent<PageNotFoundProps> = () => {
    const navigate = useNavigate();

    return (
        <section style={styles.container}>
            <video
                autoPlay
                muted
                loop
                playsInline
                id="bgVideo"
                style={styles.video}
                src="final-client/public/videos/404_background.mp4"

            />

            <div style={styles.overlay} />

            <div style={styles.content}>
                <h1 style={styles.title}>404</h1>
                <p style={styles.subtitle}>Oops! The page you’re looking for doesn’t exist.</p>
                <button style={styles.button} onClick={() => navigate("/")}>
                    Go Back Home
                </button>
            </div>
        </section>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        position: "fixed",
        top: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#fff",
    },
    video: {
        position: "fixed",
        top: "50%",
        left: "50%",
        minWidth: "100%",
        minHeight: "100%",
        width: "auto",
        height: "auto",
        zIndex: 1,
        transform: "translate(-50%, -50%)",
        objectFit: "cover",
        filter: "brightness(0.7) contrast(1.2)",
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background:
            "linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.85) 100%)",
        zIndex: 2,
    },
    content: {
        position: "relative",
        zIndex: 3,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 20px",
        textAlign: "center",
    },
    title: {
        fontSize: "10rem",
        margin: 0,
        fontWeight: "900",
        letterSpacing: "0.5rem",
        userSelect: "none",
    },
    subtitle: {
        fontSize: "1.8rem",
        marginBottom: "40px",
        maxWidth: "600px",
        userSelect: "none",
    },
    button: {
        backgroundColor: "#ff4500",
        border: "none",
        padding: "15px 40px",
        fontSize: "1.1rem",
        fontWeight: "700",
        color: "#fff",
        borderRadius: "30px",
        cursor: "pointer",
        boxShadow: "0 6px 12px rgba(255, 69, 0, 0.5)",
        transition: "background-color 0.3s ease, transform 0.2s ease",
        userSelect: "none",
    },
};

export default PageNotFound;
