// import { utilService } from './util.service.js'
// import { storageService } from './async-storage.service.js'
// import { httpService } from './http.service.js'


// const labels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor", "Battery Powered"]
// const PLANT_KEY = 'plantDB'
// const BASE_URL = 'plant/'

// // _createPlants()

// export const plantService = {
//     query,
//     get,
//     remove,
//     save,
//     getEmptyPlant,
//     getDefaultFilter,
//     getRandomPlant,
//     getById,
//     getPlantsTypeNum,
//     getPlantLabels,
//     getEmptyMsg,
//     addPlantMsg
// }

// function query(filterBy = getDefaultFilter()) {
//     const queryParams = `?name=${filterBy.name}&price=${filterBy.price}&inStock=${filterBy.inStock}&lables=${JSON.stringify(filterBy.lables)}`
//     return httpService.get(BASE_URL + queryParams)
// }

// function get(plantId) {
//     return httpService.get(BASE_URL + plantId)
// }

// function remove(plantId) {
//     return httpService.delete(BASE_URL + plantId)
// }

// function save(plant) {
//     if (plant._id) {
//         return httpService.put(BASE_URL + plant._id, plant)
//     } else {
//         return httpService.post(BASE_URL, plant)
//     }
// }

// function getById(plantId) {
//     return storageService.get(PLANT_KEY, plantId)
// }


// function getRandomPlant() {
//     var plant = getEmptyPlant()
//     plant.price = utilService.getRandomIntInclusive(10, 900)
//     plant.name = 'Plant-' + (Date.now() % 1000)
//     return plant
// }

// function getPlantsTypeNum() {
//     let plantsTypeNum = {}
//     query()
//         .then(plants => {
//             plants.forEach(plant => {
//                 plant.labels.forEach(lable => {
//                     if (!plantsTypeNum[lable]) {
//                         plantsTypeNum[lable] = 1
//                     } else {
//                         plantsTypeNum[lable] += 1
//                     }
//                     return plantsTypeNum
//                 })

//             })
//             console.log('plantsTypeNum', plantsTypeNum)
//         })
//     console.log('plantsTypeNum', plantsTypeNum)
//     return plantsTypeNum
// }

// function getEmptyPlant(name = '', price = '') {
//     var plant = {
//         name,
//         price,
//         lables: ["Doll", "Battery Powered", "Baby"],
//         createdAt: '',
//         inStock: true,
//         imgName: name
//     }
//     return plant
// }

// function getDefaultFilter() {
//     return { name: '', price: '', inStock: '', lables: [] }
// }

// function getPlantLabels() {
//     const labels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor", "Battery Powered"]
//     return labels
// }

// function getEmptyMsg() {
//     return {
//         id: utilService.makeId(),
//         txt: ''
//     }
// }

// async function addPlantMsg(plantId, msg) {
//     try {
//         const savedMsg = await httpService.post(`plant/${plantId}/msg`, { msg })
//         return savedMsg
//     } catch (e) {
//         /// do error handling 
//     }

// }



// function _createPlants() {
//     let plants = utilService.loadFromStorage(PLANT_KEY)
//     if (!plants || !plants.length) {
//         plants = []
//         plants.push(_createPlant('Talking doll', 300))
//         plants.push(_createPlant('Star wars', 120))
//         plants.push(_createPlant('Lego', 50))
//         plants.push(_createPlant('Boba', 150))
//         utilService.saveToStorage(PLANT_KEY, plants)
//     }
// }

// function _createPlant(name, price = 250) {
//     const plant = getEmptyPlant(name, price)
//     plant._id = utilService.makeId()
//     plant.createdAt = Date.now()
//     return plant
// }