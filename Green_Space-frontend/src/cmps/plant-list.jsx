import { PlantPreview } from "./plant-preview.jsx"
import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux'


export function PlantList({ plants, onRemovePlant, onEditPlant }) {
    const user = useSelector(storeState => storeState.userModule.user)

    return <ul className="plant-list">
        {plants.map(plant =>
            <li className="plant-preview" key={plant._id}>
                <PlantPreview plant={plant} />
                <NavLink className={'details'} to={`/plant/${plant._id}`}>More deatails</NavLink>
                <hr />
                {(user?.isAdmin) && <div className="flex edit">
                    <div className="trash" onClick={() => { onRemovePlant(plant._id) }}> </div>                    |
                    <NavLink to={`/plant/edit/${plant._id}`}>Edit</NavLink>
                </div>
                }
            </li>)}
    </ul>
}


