const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Inventory = require('./Inventory');

const stockMovementSchema = new Schema({
    articleId: {type: mongoose.Schema.Types.ObjectId, ref: 'Article'},
    movement_type: {type: String, required: true},
    quantity: {type: Number, required: true},
    price: {type: Number, required: true},
    isConsumed: {type: Boolean, default: false},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true});

stockMovementSchema.post('save', function(doc) {

    if (doc.movement_type === 'purchase') {
        const newInventory = Inventory({
            articleId: doc.articleId,
            currentStock: {
                quantity: doc.quantity,
                price: doc.price
            }
        });

        newInventory.save();

    }
    
  });

const StockMovement = mongoose.model('StockMovement', stockMovementSchema);

module.exports = StockMovement;