const express = require('express');
const Article = require('../models/Article');

const router = express.Router();

// get all articles
router.get('/', (req, res) => {
    Article.find().sort({ articleName: -1 })
        .then(result => res.send(result))
        .catch(err => console.log(err));
});

// get all articles that need a replenishment
// and calculate the minimum amount to be ordered to meet the minimum stock
router.get('/replenishment', (req, res) => {
    Article.find({ $expr: { $gt: [ "$minStock" , "$currentStock.quantity" ] } }, 'articleName minStock currentStock').lean()
        .then(result => {
            result = result.map( r => ({
                ...r,
                minOrder: r.minStock - r.currentStock.quantity
            }));
            res.send(result);
        })
        .catch(err => console.log(err));
});

// get a specific article by name
router.get('/:name', (req, res) => {
    Article.find({"articleName": req.params.name})
    .then(result => res.send(result))
    .catch(err => console.log(err));
});

// get a specific article by id
router.get('/:id', (req, res) => {
    Article.findById(req.params.id)
        .then(result => res.send(result))
        .catch(err => console.log(err));
});

// Create a new article
router.post('/', (req, res) => {
    const article = new Article(req.body);

    article.save()
        .then(result => res.send(result))
        .catch(err => console.log(err));
});

// Delete a specific article
router.delete('/:id', (req, res) => {
    Article.findByIdAndDelete(req.params.id)
        .then(res.json({redirect: '/articles'}))
        .catch(err => console.log(err));
});

// Update an article
router.put('/:id', (req, res) => {
    Article.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then(result => res.send(result))
        .catch(err => console.log(err));
});

module.exports = router;