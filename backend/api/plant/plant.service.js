const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const utilService = require('../../services/util.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy) {
    try {
        const criteria = getFilterBy(filterBy)
        const collection = await dbService.getCollection('plants')
        var plants = await collection.find(criteria).toArray()
        return plants
    } catch (err) {
        logger.error('cannot find plants', err)
        throw err
    }
}

function getFilterBy(filterBy) {
    if (filterBy.inStock === 'false') filterBy.inStock = false
    if (filterBy.inStock === 'true') filterBy.inStock = true
    let lables = JSON.parse(filterBy.lables)
    if (!lables.length) {
        lables = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor", "Battery Powered"]
    }
    const criteria = {
        name: { $regex: filterBy.name, $options: 'i' },
        price: { $lte: +filterBy.price },
        inStock: filterBy.inStock,
        lables: { $in: lables }
    }


    return criteria
}

async function getById(plantId) {
    try {
        const collection = await dbService.getCollection('plants')
        const plant = collection.findOne({ _id: ObjectId(plantId) })
        return plant
    } catch (err) {
        logger.error(`while finding plant ${plantId}`, err)
        throw err
    }
}

async function remove(plantId) {
    try {
        const collection = await dbService.getCollection('plants')
        await collection.deleteOne({ _id: ObjectId(plantId) })
        return plantId
    } catch (err) {
        logger.error(`cannot remove plant ${plantId}`, err)
        throw err
    }
}

async function add(plant) {
    try {
        const collection = await dbService.getCollection('plants')
        await collection.insertOne(plant)
        return plant
    } catch (err) {
        logger.error('cannot insert plant', err)
        throw err
    }
}

async function update(plant) {
    console.log(plant);
    try {
        const plantToSave = {
            name: plant.name,
            price: plant.price,
            lables: plant.lables,
            inStock: plant.inStock,
            imgName: plant.imgName,

        }
        const collection = await dbService.getCollection('plants')
        await collection.updateOne({ _id: ObjectId(plant._id) }, { $set: plantToSave })
        return plant
    } catch (err) {
        logger.error(`cannot update plant ${plantId}`, err)
        throw err
    }
}

async function addPlantMsg(plantId, msg) {
    try {
        msg.id = utilService.makeId()
        const collection = await dbService.getCollection('plants')
        await collection.updateOne({ _id: ObjectId(plantId) }, { $push: { msgs: msg } })
        return msg
    } catch (err) {
        logger.error(`cannot add plant msg ${plantId}`, err)
        throw err
    }
}

async function removePlantMsg(plantId, msgId) {
    try {
        const collection = await dbService.getCollection('plants')
        await collection.updateOne({ _id: ObjectId(plantId) }, { $pull: { msgs: { id: msgId } } })
        return msgId
    } catch (err) {
        logger.error(`cannot add plant msg ${plantId}`, err)
        throw err
    }
}

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
    addPlantMsg,
    removePlantMsg
}
