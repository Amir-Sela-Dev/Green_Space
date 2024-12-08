import { PlantPreview } from "./plant-preview.jsx";
import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { plantService } from '../services/plant.service.local.js';

export function PlantList({ plants, onRemovePlant, onEditPlant }) {
    const [sortedPlants, setSortedPlants] = useState([]);
    const user = useSelector(storeState => storeState.userModule.user);

    useEffect(() => {
        const userProfile = plantService.getUserProfile(); // Get user preferences
        const sorted = plants
            .map(plant => ({
                ...plant,
                matchScore: calculateMatchScore(plant, userProfile),
            }))
            .sort((a, b) => b.matchScore - a.matchScore); // Sort by match score descending
        setSortedPlants(sorted);
    }, [plants]);

    const calculateMatchScore = (plant, userProfile) => {
        if (!userProfile) return 0;
        let score = 0;

        if (plant.type.includes(userProfile[1])) score += 20;
        if (plant.light_requirements === userProfile[2]) score += 20;
        if (plant.maintenance_level === userProfile[3]) score += 20;
        if (userProfile[4] !== 'No preference' && plant.flowering === (userProfile[4] === 'Flowering')) score += 20;
        if (userProfile[5] === 'No' || plant.toxic_to_pets === false) score += 20;

        return score;
    };

    return (
        <ul className="plant-list">
            {sortedPlants.map(plant => (
                <li className="plant-preview" key={plant._id}>
                    <PlantPreview plant={plant} />
                    <NavLink className={'details'} to={`/plant/${plant._id}`}>More details</NavLink>
                    <hr />
                    {user?.isAdmin && (
                        <div className="flex edit">
                            <div className="trash" onClick={() => { onRemovePlant(plant._id) }}></div> |
                            <NavLink to={`/plant/edit/${plant._id}`}>Edit</NavLink>
                        </div>
                    )}
                </li>
            ))}
        </ul>
    );
}
