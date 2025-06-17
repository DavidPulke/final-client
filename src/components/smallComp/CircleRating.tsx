import React from "react";


interface CircularRatingProps {
    value: number;
}

const CircularRating: React.FC<CircularRatingProps> = ({ value }) => {



    const percentage = Math.min(Math.max(value * 10, 0), 100);
    const radius = 60;
    const stroke = 10;
    const normalizedRadius = radius - stroke / 2;
    const circumference = 2 * Math.PI * normalizedRadius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    const getColorByValue = (value: number): string => {
        if (value <= 3) return "#e74c3c";     // אדום
        if (value <= 6) return "#f39c12";     // כתום
        if (value <= 8) return "#f1c40f";     // צהוב
        return "#2ecc71";                     // ירוק
    };


    return (
        <div className="circular-rating-container">
            <svg height={radius * 2} width={radius * 2}>
                <circle
                    stroke="#e6e6e6"
                    fill="transparent"
                    strokeWidth={stroke}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
                <circle
                    stroke={getColorByValue(value)} // צבע משתנה לפי ערך
                    fill="transparent"
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                    className="progress"
                />

            </svg>
            <div className="rating-text">
                <span>{value.toFixed(1)}</span>
            </div>
        </div>
    );
};

export default CircularRating;
