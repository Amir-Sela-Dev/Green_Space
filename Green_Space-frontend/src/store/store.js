import { combineReducers, legacy_createStore as createStore } from 'redux'

import { plantReducer } from './plant.reducer.js'
import { userReducer } from './user.reducer.js'
import { reviewReducer } from './review.reducer'


// const { createStore, combineReducers } = Redux
// const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()

const rootReducer = combineReducers({
    plantModule: plantReducer,
    userModule: userReducer,
    reviewModule: reviewReducer,

})

export const store = createStore(rootReducer)

// For debug 
store.subscribe(() => {
    // console.log('**** Store state changed: ****')
    // console.log('storeState:\n', store.getState())
    // console.log('*******************************')
})

// setInterval(() => {
//     store.dispatch({ type: 'INCREMENT' })
// }, 1000)
// store.dispatch({type: 'INCREMENT'})
// store.dispatch({type: 'INCREMENT'})
// store.dispatch({type: 'INCREMENT'})
