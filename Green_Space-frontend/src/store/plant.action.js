import { plantService } from '../services/plant.service.local.js'
import { store } from './store.js'
import { REMOVE_PLANT, SET_PLANTS, ADD_PLANT, UPDATE_PLANT, UNDO_REMOVE_PLANT, SET_IS_LOADING, SET_PLANT } from '../store/plant.reducer.js'

export async function
    loadPlants(filterBy) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    try {
        const plants = await plantService.query(filterBy)
        store.dispatch({ type: SET_PLANTS, plants })
    } catch (err) {
        console.log('Had issues loading plants', err)
        throw err
    } finally {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}


// Example for Optimistic mutation:
export async function removePlant(plantId) {
    try {
        store.dispatch({ type: REMOVE_PLANT, plantId })
        plantService.remove(plantId)
    } catch (err) {
        store.dispatch({ type: UNDO_REMOVE_PLANT })
        console.log('Had issues Removing plant', err)
        throw err
    }
}


// export function removePlantNormal(plantId) {
//     return plantService.remove(plantId)
//         .then(() => {
//             store.dispatch({ type: REMOVE_PLANT, plantId })
//         })
//         .catch(err => {
//             console.log('Had issues Removing plant', err)
//             throw err
//         })
// }

export async function savePlant(plant) {
    try {
        plant.price = +plant.price
        const type = (plant._id) ? UPDATE_PLANT : ADD_PLANT
        const savedPlant = await plantService.save(plant)
        store.dispatch({ type, plant: savedPlant })
        return savedPlant
    } catch (err) {
        console.error('Cannot save plant:', err)
        throw err
    }
}


export async function loadPlant(plantId) {
    try {
        const plant = await plantService.get(plantId)
        store.dispatch({ type: SET_PLANT, plant })
        return plant
    } catch (err) {
        console.log('Had issues loading plant', err)
        throw err
    }
}

