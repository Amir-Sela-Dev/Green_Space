const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getPlants, getPlantById, addPlant, updatePlant, removePlant, addPlantMsg, removePlantMsg } = require('./plant.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getPlants)
// router.get('/', getPlants)
router.get('/:id', getPlantById)
router.post('/', requireAuth, addPlant)
router.put('/:id', /* requireAuth, */ updatePlant)
router.delete('/:id', requireAdmin, removePlant)
// router.delete('/:id', requireAuth, requireAdmin, removePlant)

router.post('/:id/msg', requireAuth, addPlantMsg)
router.delete('/:id/msg/:msgId', requireAuth, removePlantMsg)

module.exports = router