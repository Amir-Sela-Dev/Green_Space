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
        <article>
            <h4 onClick={() => { navigate(`/plant/${plant._id}`); }}>{plant.name}</h4>
            <img
                onClick={() => { navigate(`/plant/${plant._id}`); }}
                src={imgUrl}
                alt={plant.name}
            />
            <p onClick={() => { navigate(`/plant/${plant._id}`); }}>
                <span>${plant.price}</span>
            </p>
        </article>
    );
}
