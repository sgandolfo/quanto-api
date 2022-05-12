const mongoose = require('mongoose');
const Schema = mongoose.Schema

const inventorySchema = new Schema({
    articleId: {type: mongoose.Schema.Types.ObjectId, ref: 'Article'},
    currentStock: {
        quantity: {type: Number, required: true},
        price: {type: Number, required: true},
    },
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true});

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;