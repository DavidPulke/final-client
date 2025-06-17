import React, { useEffect, useState } from "react";


interface CharacterCardProps {
    name: string;
}

interface WikiData {
    title: string;
    extract: string;
    thumbnail?: {
        source: string;
    };
    content_urls: {
        desktop: {
            page: string;
        };
    };
}

const CharacterCard: React.FC<CharacterCardProps> = ({ name }) => {
    const [data, setData] = useState<WikiData | null>(null);

    useEffect(() => {
        const fetchWikiData = async () => {
            try {
                const res = await fetch(
                    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name)}`
                );
                if (!res.ok) throw new Error("Not found");
                const json = await res.json();
                setData(json);
            } catch (err) {
                console.error(`Error fetching data for ${name}:`, err);
            }
        };

        fetchWikiData();
    }, [name]);

    if (!data) return null;

    return (
        <div
            title={data.title}
            className="character-card"
            onClick={() => window.open(data.content_urls.desktop.page, "_blank")}
        >
            {data.thumbnail ? (
                <img
                    src={data.thumbnail.source}
                    alt={data.title}
                    onError={(e) => {
                        e.currentTarget.src = "images/DefaultUserImage.png"
                    }}
                />
            ) : <img
                src="images/DefaultUserImage.png"
                alt={data.title}
            />}

            <span>{data.title}</span>

        </div>
    );
};

export default CharacterCard;
