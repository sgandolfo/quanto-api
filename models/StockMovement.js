const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Article = require('./Article');

const stockMovementSchema = new Schema({
    articleId: {type: mongoose.Schema.Types.ObjectId, ref: 'Article'},
    movement_type: {type: String, required: true},
    quantity: {type: Number, required: true},
    price: {type: Number, required: true},
    isConsumed: {type: Boolean, default: false},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true});

stockMovementSchema.post('save', function(doc) {
    console.log(`We receive the following ${doc}`);
    Article.findById(doc.articleId)
        .then(result => {
            result.currentStock.quantity += doc.quantity;
            result.currentStock.value += doc.quantity * doc.price
            result.save()
        })
        .catch(err => console.log(err));
  });

const StockMovement = mongoose.model('StockMovement', stockMovementSchema);

module.exports = StockMovement;