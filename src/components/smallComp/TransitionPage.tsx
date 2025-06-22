import { FunctionComponent } from "react";


interface TransitionPageProps {
    message: string;
}

const TransitionPage: FunctionComponent<TransitionPageProps> = ({ message }) => {
    return (<div className="transition-page">
        <div className="overlay">
            <div className="spinner" />
            <h2>{message}</h2>
            <p>It might take a while...</p>
        </div>
    </div>);
}

export default TransitionPage;
