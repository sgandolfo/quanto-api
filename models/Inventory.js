const mongoose = require('mongoose');
const Schema = mongoose.Schema

const inventorySchema = new Schema({
    articleId: {type: mongoose.Schema.Types.ObjectId, ref: 'Article'},
    currentStock: {
        quantity: {type: Number, required: true},
        price: {type: Number, required: true},
        inventoryDate: {type: Date, default: new Date()}
    },
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true});

articleSchema.plugin(mongooseIntl, { languages: ['nl', 'it', 'fr'], defaultLanguage: 'fr'});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;