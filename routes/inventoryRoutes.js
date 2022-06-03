const express = require('express');
const Inventory = require('../models/Inventory');

const router = express.Router();

// get the total inventory of all articles
router.get('/', (req, res) => {
    Inventory.find()
        .then(result => res.send(result))
        .catch(err => console.log(err));
});

// get the total inventory value
router.get('/total', async (req, res) => {
    const result = await Inventory.find();
    const invVal = inventoryValue(result);
    res.send({
        inventory_value: invVal.toFixed(2)
    });
});

// get the inventory for a given article
router.get('/:articleId', (req, res) => {
    Inventory.find({ articleId: req.body.params })
    .then((result) => res.send(result))
    .catch(err => res.status(500).send(err));
});

// Create a new inventory
router.post('/', (req, res) => {
    const newInventory = new Inventory(req.body);

    newInventory.save()
    .then((result) => res.send(result))
    .catch(err => res.status(500).send(err));
});

const inventoryValue = (queryResult) => {
    let accumulator = 0
    const result = queryResult.forEach(element => {
        accumulator += element.currentStock.quantity * element.currentStock.price
    })
    return accumulator;
}

module.exports = router;