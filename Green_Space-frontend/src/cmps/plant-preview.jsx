import { useNavigate } from "react-router-dom";

export function PlantPreview({ plant }) {
    const navigate = useNavigate();

    // Try to fetch the specific image, fall back to a default image
    let imgUrl;
    try {
        imgUrl = require(`../assets/img/${plant.imgName}.png`);
    } catch {
        imgUrl = require('../assets/img/Ficus benjamina.png'); // Default fallback image
    }

    return (
        <article className="plant-preview" onClick={() => { navigate(`/plant/${plant._id}`); }}>
            <h4 className="plant-name">{plant.name}</h4>
            <img
                className="plant-image"
                src={imgUrl}
                alt={`Image of ${plant.name}`}
            />
            <p className="plant-price">
                Price: <span>${plant.price}</span>
            </p>
            {plant.matchScore !== undefined && (
                <p className="plant-match">
                    Match Score: <strong>{plant.matchScore}%</strong>
                </p>
            )}
        </article>
    );
}
