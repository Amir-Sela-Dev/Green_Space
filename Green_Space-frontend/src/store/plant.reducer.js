import { plantService } from '../services/plant.service.local.js'
export const SET_PLANTS = 'SET_PLANTS'
export const REMOVE_PLANT = 'REMOVE_PLANT'
export const UNDO_REMOVE_PLANT = 'UNDO_REMOVE_PLANT'
export const ADD_PLANT = 'ADD_PLANT'
export const UPDATE_PLANT = 'UPDATE_PLANT'
export const TOGGLE_PLANTT_SHOWN = 'TOGGLE_PLANTT_SHOWN'
export const ADD_TO_PLANTT = 'ADD_TO_PLANTT'
export const REMOVE_FROM_PLANTT = 'REMOVE_FROM_PLANTT'
export const CLEAR_PLANTT = 'CLEAR_PLANTT'
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const SET_PLANT = 'SET_PLANT'




const initialState = {
    plants: [],
    plant: plantService.getEmptyPlant(),
    lastRemovedPlant: null,
    isLoading: false,
}


export function plantReducer(state = initialState, action) {
    let plants
    let lastRemovedPlant

    switch (action.type) {
        case SET_PLANTS:
            return { ...state, plants: action.plants }
        case SET_PLANT:
            return { ...state, plant: action.plant }
        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading }

        case REMOVE_PLANT:
            lastRemovedPlant = state.plants.find(t => t._id === action.plantId)
            plants = state.plants.filter(t => t._id !== action.plantId)
            return { ...state, plants, lastRemovedPlant }

        case UNDO_REMOVE_PLANT:
            ({ lastRemovedPlant } = state)
            plants = [lastRemovedPlant, ...state.plants]
            return { ...state, plants, lastRemovedPlant: null }

        case ADD_PLANT:
            plants = [...state.plants, action.plant]
            return { ...state, plants }
        case UPDATE_PLANT:
            plants = state.plants.map(plant => plant._id === action.plant._id ? action.plant : plant)
            return { ...state, plants }

        default:
            return state
    }
}


