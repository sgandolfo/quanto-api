const mongoose = require('mongoose');
const mongooseIntl = require('mongoose-intl');
const Schema = mongoose.Schema

const articleSchema = new Schema({
    articleName: {type: String, required: true, intl: true},
    ean: {type: String},
    articleCategory: {type: String, required: true},
    valuationMethod: {type: String, default: 'FIFO'},
    unitOfMeasure: {type: String, required: true},
    minStock: {type: Number},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true});

articleSchema.plugin(mongooseIntl, { languages: ['nl', 'it', 'fr'], defaultLanguage: 'fr'});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;