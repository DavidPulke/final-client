import { FunctionComponent, useEffect, useState } from "react";

interface StatCardProps {
    label: string;
    value: number;
    max: number;
    icon: string;
}

const StatCard: FunctionComponent<StatCardProps> = ({ label, value, max, icon }) => {
    const [count, setCount] = useState(0);
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prev) => {
                if (prev < value) return prev + 1;
                clearInterval(interval);
                return value;
            });
        }, 10);

        setPercent(Math.min((value / max) * 100, 100));
        return () => clearInterval(interval);
    }, [value, max]);

    return (
        <div className="stat-card">
            <div className="half-circle-container">
                <div className="half-circle">
                    <div
                        className="half-circle-fill"
                        style={{ width: `${percent}%` }}
                    ></div>
                    <div className="stat-number">{icon} {count}</div>
                </div>
            </div>
            <div className="stat-label">{label}</div>
        </div>
    );
};

export default StatCard;
