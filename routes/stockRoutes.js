const express = require('express');
const StockMovement = require('../models/StockMovement');
const Inventory = require('../models/Inventory');
const Article = require('../models/Article');
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

    // try {
    //     const createdStockMovement = await StockMovementService.createStockMovement(req.body);
    //     return res.send(createdStockMovement);
    // } catch (error) {
    //     console.log(error);
    //     res.status(500).send(error)
    // }

    if (req.body.movement_type === 'purchase') {
        const result = await StockMovement.create(req.body);
        return res.send(result);
    } else {
        const valMethod = await Article.findById(req.body.articleId, 'valuationMethod');

        let articleStock = [];
        let createArray = [];
    
        let movementQuantity = Math.abs(req.body.quantity);
    
        let movementDocument = {
            articleId: req.body.articleId,
            movement_type: 'goods issue',
            isConsumed: true,
            createdBy: req.body.createdBy
        };
    
        switch (valMethod) {
            case 'LIFO':
                articleStock = await Inventory.find({ articleId: req.body.articleId }).sort({ createdAt: -1 }).exec();
                break;
        
            default:
                articleStock = await Inventory.find({ articleId: req.body.articleId }).sort({ createdAt: 1 }).exec();
                break;
        }
    
        if(movementQuantity > 0) {
            articleStock.forEach(i => {
                if (i.currentStock.quantity <= movementQuantity) {
                    Inventory.findByIdAndRemove(i._id).exec();
                    createArray.push({
                        ...movementDocument,
                        quantity: i.currentStock.quantity * -1,
                        price: i.currentStock.price,
                    });
                    movementQuantity -= i.currentStock.quantity;
                } else {
                    Inventory.findByIdAndUpdate(i._id, {currentStock: {quantity: i.currentStock.quantity - movementQuantity, price: i.currentStock.price}}).exec();
                    createArray.push({
                        ...movementDocument,
                        quantity: movementQuantity * -1,
                        price: i.currentStock.price,
                    });
                    movementQuantity = 0;
                }
            })
        };
    
        const result = await StockMovement.create(createArray);
    
        return res.send(result);
    }
    
});

module.exports = router;