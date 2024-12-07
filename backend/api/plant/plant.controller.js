const plantService = require('./plant.service.js')

const logger = require('../../services/logger.service.js')

async function getPlants(req, res) {
    try {
        logger.debug('Getting Plants')
        const filterBy = {
            name: req.query.name || '',
            price: req.query.price || 1000,
            inStock: req.query.inStock || 'true',
            lables: req.query.lables || ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor", "Battery Powered"],
        }
        const plants = await plantService.query(filterBy)
        res.json(plants)
    } catch (err) {
        logger.error('Failed to get plants', err)
        res.status(500).send({ err: 'Failed to get plants' })
    }
}

async function getPlantById(req, res) {
    try {
        const plantId = req.params.id
        const plant = await plantService.getById(plantId)
        res.json(plant)
    } catch (err) {
        logger.error('Failed to get plant', err)
        res.status(500).send({ err: 'Failed to get plant' })
    }
}

async function addPlant(req, res) {
    const { loggedinUser } = req

    try {
        const plant = req.body
        plant.owner = loggedinUser
        const addedPlant = await plantService.add(plant)
        res.json(addedPlant)
    } catch (err) {
        logger.error('Failed to add plant', err)
        res.status(500).send({ err: 'Failed to add plant' })
    }
}


async function updatePlant(req, res) {
    console.log('update!!1');
    try {
        const plant = req.body
        const updatedPlant = await plantService.update(plant)
        res.json(updatedPlant)
    } catch (err) {
        logger.error('Failed to update plant', err)
        res.status(500).send({ err: 'Failed to update plant' })

    }
}

async function removePlant(req, res) {
    try {
        const plantId = req.params.id
        const removedId = await plantService.remove(plantId)
        res.send(removedId)
    } catch (err) {
        logger.error('Failed to remove plant', err)
        res.status(500).send({ err: 'Failed to remove plant' })
    }
}

async function addPlantMsg(req, res) {
    const { loggedinUser } = req
    try {
        const plantId = req.params.id
        const msg = {
            txt: req.body.txt,
            by: loggedinUser
        }
        const savedMsg = await plantService.addPlantMsg(plantId, msg)
        res.json(savedMsg)
    } catch (err) {
        logger.error('Failed to update plant', err)
        res.status(500).send({ err: 'Failed to update plant' })

    }
}

async function removePlantMsg(req, res) {
    const { loggedinUser } = req
    try {
        const plantId = req.params.id
        const { msgId } = req.params

        const removedId = await plantService.removePlantMsg(plantId, msgId)
        res.send(removedId)
    } catch (err) {
        logger.error('Failed to remove plant msg', err)
        res.status(500).send({ err: 'Failed to remove plant msg' })

    }
}

module.exports = {
    getPlants,
    getPlantById,
    addPlant,
    updatePlant,
    removePlant,
    addPlantMsg,
    removePlantMsg
}
