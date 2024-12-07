import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
import plantsDataBase from './plants-database.json'
const labels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor", "Battery Powered"]
const PLANT_KEY = 'plantDB'
_createPlants()

export const plantService = {
    query,
    get,
    remove,
    save,
    getEmptyPlant,
    getDefaultFilter,
    getRandomPlant,
    getById,
    getPlantLabels
}

function query(filterBy = getDefaultFilter()) {
    return storageService.query(PLANT_KEY)
        .then(plants => {
            if (filterBy.name) {
                const regex = new RegExp(filterBy.name, 'i')
                plants = plants.filter(plant => regex.test(plant.name))
            }
            if (filterBy.price) {
                plants = plants.filter(plant => plant.price >= filterBy.price)
            }
            return plants
        })
}

function get(plantId) {
    return storageService.get(PLANT_KEY, plantId)

}

function remove(plantId) {
    return storageService.remove(PLANT_KEY, plantId)
}

function save(plant) {
    if (plant._id) {
        return storageService.put(PLANT_KEY, plant)
    } else {
        return storageService.post(PLANT_KEY, plant)
    }
}

function getById(plantId) {
    return storageService.get(PLANT_KEY, plantId)
}


function getRandomPlant() {
    var plant = getEmptyPlant()
    plant.price = utilService.getRandomIntInclusive(1000, 9000)
    plant.name = 'Plant-' + (Date.now() % 1000)
    return plant
}

function getEmptyPlant(name = '', price = '') {
    var plant = {
        name,
        price,
        labels: ["Doll", "Battery Powered", "Baby"],
        createdAt: '',
        inStock: true,
        imgName: name
    }
    return plant
}

function getDefaultFilter() {
    return { name: '', price: '' }
}

function _createPlants() {
    let plants = utilService.loadFromStorage(PLANT_KEY);
    if (!plants || !plants.length) {
        // Use JSON data to populate plants
        plants = plantsDataBase.map((plant) => ({
            ...plant,
            _id: utilService.makeId(), // Add unique IDs if required
            price: utilService.getRandomPrice(),
            imgName: plant.name
        }));
        utilService.saveToStorage(PLANT_KEY, plants);
    }
}
function _createPlant(name, price = 250) {
    const plant = getEmptyPlant(name, price)
    plant._id = utilService.makeId()
    plant.createdAt = Date.now()
    return plant
}

function getPlantLabels() {
    return ["Indoor", "Outdoor", "Low Maintenance", "Flowering", "Succulent"];
}