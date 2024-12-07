
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { plantService } from '../services/plant.service.local.js'
import { loadPlants, removePlant, savePlant } from '../store/plant.action.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { PlantList } from '../cmps/plant-list.jsx'
import { PlantFilter } from '../cmps/plant-filter.jsx'
import { NavLink } from 'react-router-dom'

export function PlantIndex() {
    const { plants } = useSelector((storeState) => storeState.plantModule)
    const user = useSelector(storeState => storeState.userModule.user)

    useEffect(() => {
        onLoadPlants()
    }, [])

    async function onLoadPlants(filterBy) {
        try {
            await loadPlants(filterBy)
        }
        catch (err) {
            showErrorMsg('Cannot load plants')
        }
    }

    async function onRemovePlant(plantId) {
        try {
            await removePlant(plantId)
            showSuccessMsg('Plant removed')
        } catch (err) {
            showErrorMsg('Cannot remove plant')
        }
    }

    async function onAddPlant() {
        try {
            const plantToSave = plantService.getRandomPlant()
            const savedPlant = await savePlant(plantToSave)
            showSuccessMsg(`Plant added (name: ${savedPlant.name})`)
        } catch (err) {
            showErrorMsg('Cannot add plant')
        }
    }

    async function onEditPlant(plant) {
        try {
            const price = +prompt('New price?')
            const plantToSave = { ...plant, price }
            const savedPlant = await savePlant(plantToSave)
            showSuccessMsg(`Plant updated to price: $${savedPlant.price}`)
        } catch (err) {
            showErrorMsg('Cannot update plant')
        }
    }


    function setFilter(filterBy) {
        onLoadPlants(filterBy)
    }

    return <section className='plant-main-index'>
        <div className="first-row">
            <h3>Plants & Joys shop</h3>
            {(user?.isAdmin) && <div className="add-btns">
                <button className='btn' onClick={onAddPlant}>Add random Plant ⛐</button>
                <NavLink className='btn' to={`/plant/edit`}>Add plant!</NavLink>
            </div>
            }        </div>

        <main>
            <PlantFilter onSetFilter={setFilter} />

            <PlantList
                plants={plants}
                onRemovePlant={onRemovePlant}
                onEditPlant={onEditPlant}
            />
        </main>
    </section>
}


