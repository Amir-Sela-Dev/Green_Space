const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')

async function query(filterBy = {}) {
    try {
        const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('review')
        // const reviews = await collection.find(criteria).toArray()
        var reviews = await collection.aggregate([
            {
                $match: criteria
            },
            {
                $lookup:
                {
                    from: 'user',
                    localField: 'byUserId',
                    foreignField: '_id',
                    as: 'byUser'
                }
            },
            {
                $unwind: '$byUser'
            },
            {
                $lookup:
                {
                    from: 'plants',
                    localField: 'aboutPlantId',
                    foreignField: '_id',
                    as: 'aboutPlant'
                }
            },
            {
                $unwind: '$aboutPlant'
            }
        ]).toArray()
        reviews = reviews.map(review => {

            review.byUser = { _id: review.byUser._id, fullname: review.byUser.fullname }
            review.aboutPlant = { _id: review.aboutPlant._id, fullname: review.aboutPlant.name }
            delete review.byUserId
            delete review.aboutPlantId
            return review
        })

        return reviews
    } catch (err) {
        logger.error('cannot find reviews', err)
        throw err
    }

}

async function remove(reviewId) {
    try {
        const store = asyncLocalStorage.getStore()
        const { loggedinUser } = store
        const collection = await dbService.getCollection('review')
        // remove only if user is owner/admin
        const criteria = { _id: ObjectId(reviewId) }
        if (!loggedinUser.isAdmin) criteria.byUserId = ObjectId(loggedinUser._id)
        const { deletedCount } = await collection.deleteOne(criteria)
        return deletedCount
    } catch (err) {
        logger.error(`cannot remove review ${reviewId}`, err)
        throw err
    }
}


async function add(review) {
    try {
        const reviewToAdd = {
            byUserId: ObjectId(review.byUserId),
            aboutPlantId: ObjectId(review.aboutPlantId),
            txt: review.txt
        }
        const collection = await dbService.getCollection('review')
        await collection.insertOne(reviewToAdd)
        return reviewToAdd
    } catch (err) {
        logger.error('cannot insert review', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.byUserId) criteria.byUserId = ObjectId(filterBy.byUserId)
    if (filterBy.aboutPlantId) criteria.aboutPlantId = ObjectId(filterBy.aboutPlantId)
    return criteria
}

module.exports = {
    query,
    remove,
    add
}


