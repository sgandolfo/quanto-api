const express = require('express');
const Inventory = require('../models/Inventory');

const router = express.Router();

// get the total inventory of all articles
router.get('/', (req, res) => {
    Inventory.find()
        .then(result => res.send(result))
        .catch(err => console.log(err));
});

