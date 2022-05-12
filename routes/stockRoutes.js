const express = require('express');
const StockMovement = require('../models/StockMovement');
const StockMovementService = require('../services/StockMovementService');

const router = express.Router();

// Get all stock movements
router.get('/', (req, res) => {
    StockMovement.find().sort({ createdAt: -1 })
        .then(result => res.send(result))
        .catch(err => console.log(err));
});

// Get all stock movements that are either consumed or not consumed depending on the flag
router.get('/consumed/:flag', (req, res) => {
    StockMovement.find({"isConsumed": req.params.flag}).sort({ createdAt: -1 })
        .then(result => res.send(result))
        .catch(err => console.log(err));
});

// Create a new stock movement
router.post('/', async (req, res) => {

    try {
        const createdStockMovement = await StockMovementService.createStockMovement(req.body);
        return res.send(createdStockMovement);
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
    
});

module.exports = router;