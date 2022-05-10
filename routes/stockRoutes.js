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
    

    // let updateMovementArray = [];
    // let createMovementArray = [];
    // let movementQuantity = Math.abs(req.body.quantity);

    // StockMovement.find({isConsumed: false, articleId: req.body.articleId},'_id quantity price').sort({ createdAt: 1 }).exec()
    //     .then(result => {
    //         result.forEach(i => {
    //             if(movementQuantity > 0){
    //                 if(i.quantity <= movementQuantity) {
    //                     updateMovementArray.push(i._id.toString());
    //                     createMovementArray.push({
    //                         articleId: req.body.articleId,
    //                         movement_type: 'goods issue',
    //                         quantity: i.quantity * -1,
    //                         price: i.price,
    //                         isConsumed: true,
    //                         createdBy: req.body.createdBy
    //                     });
    //                     movementQuantity -= i.quantity;
    //                 } else {
    //                     createMovementArray.push({
    //                         articleId: req.body.articleId,
    //                         movement_type: 'goods issue',
    //                         quantity: movementQuantity * -1,
    //                         price: i.price,
    //                         isConsumed: true,
    //                         createdBy: req.body.createdBy
    //                     });
    //                     movementQuantity = 0;
    //                 }
    //             }
    //         });
    //     })
    //     .then(result => {
    //         updateMovementArray.forEach(i => {
    //             StockMovement.findByIdAndUpdate(i, {isConsumed: true})
    //         });
            
    //         StockMovement.create(createMovementArray)
    //             .then(result => res.send(result));
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });

});

module.exports = router;