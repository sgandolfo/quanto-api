const StockMovement = require('../models/StockMovement');
const Article = require('../models/Article');

const MongooseService = require( "./MongooseService" ); // Data Access Layer
const MongooseServiceInstance = new MongooseService(StockMovement);

const createStockMovement = async stockMovement => {

    let updateArray = [];
    let createArray = [];

    let movementDocument = {
        articleId: stockMovement.articleId,
        movement_type: 'goods issue',
        isConsumed: true,
        createdBy: stockMovement.createdBy
    };

    let movementQuantity = Math.abs(stockMovement.quantity);

    try {
        const { body: { valuationMethod } } = await retrieveValuationMethod(stockMovement.articleId);

        switch (valuationMethod) {
            case 'LIFO':
                ({createArray, updateArray} = await calculateStockMovementPrice(stockMovement.articleId, -1, movementQuantity, movementDocument));
                break;
        
            default:
                ({createArray, updateArray} = await calculateStockMovementPrice(stockMovement.articleId, 1, movementQuantity, movementDocument));
                break;
        }

        for(let i = 0; i < updateArray.length ;i++) {
            const result = await MongooseServiceInstance.update(updateArray[i]._id, {quantity: updateArray[i].quantity, isConsumed: updateArray[i].isConsumed});
            //    StockMovement.updateOne({_id: i._id}, {quantity: i.quantity, isConsumed: i.isConsumed});
            console.log(result);
        }

        const result = await StockMovement.create(createArray);

        return { success: true, body: result };

    } catch (error) {
        return { success: false, error: error };
    }
}

const calculateStockMovementPrice = async (article, valMethod, movementQuantity, movementDocument) => {

    try {
        const currentStock = await StockMovement.find({isConsumed: false, articleId: article},'_id quantity price').sort({ createdAt: valMethod }).exec()
        
        return { createArray, updateArray } = fillMovementArrays(movementQuantity, currentStock, movementDocument);

    } catch (error) {
        return { success: false, error: error };
    }
}

const fillMovementArrays = (movementQuantity, currentStock, movementDocument) => {

    let createArray = [];
    let updateArray = [];

    if(movementQuantity > 0) {
        currentStock.forEach(i => {
            if (i.quantity <= movementQuantity) {
                updateArray.push({
                    _id: i._id.toString(),
                    quantity: 0,
                    isConsumed: true
                });
                createArray.push({
                    ...movementDocument,
                    quantity: i.quantity * -1,
                    price: i.price,
                });
                movementQuantity -= i.quantity;
            } else {
                updateArray.push({
                    _id: i._id.toString(),
                    quantity: i.quantity - movementQuantity,
                    isConsumed: false
                })
                createArray.push({
                    ...movementDocument,
                    quantity: movementQuantity * -1,
                    price: i.price,
                });
                movementQuantity = 0;
            }
        })
    };

    return { createArray, updateArray };
}

const retrieveValuationMethod = async (article) => {

    try {
        const valMethod = await Article.findById(article, 'valuationMethod');

        return { success: true, body: valMethod }
    } catch (error) {

        return { success: false, error: error };
    }

}

module.exports = {
    createStockMovement
};