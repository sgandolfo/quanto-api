const StockMovement = require('../models/StockMovement');
const Article = require('../models/Article');
const Inventory = require('../models/Inventory');

const MongooseService = require( "./MongooseService" ); // Data Access Layer
const StockMovementMongooseInstance = new MongooseService(StockMovement);
const InventoryMongooseInstance = new MongooseService(Inventory);

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
            const result = await InventoryMongooseInstance.update(updateArray[i]._id, {quantity: updateArray[i].quantity});
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
        const currentStock = await InventoryMongooseInstance.find({articleId: article},{_id, currentStock}).sort({ createdAt: valMethod }).exec()
        console.log(currentStock);
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
            if (i.currentStock.quantity <= movementQuantity) {
                updateArray.push({
                    _id: i._id.toString(),
                    quantity: 0,
                });
                createArray.push({
                    ...movementDocument,
                    quantity: i.currentStock.quantity * -1,
                    price: i.currentStock.price,
                });
                movementQuantity -= i.quantity;
            } else {
                updateArray.push({
                    _id: i._id.toString(),
                    quantity: i.currentStock.quantity - movementQuantity,
                })
                createArray.push({
                    ...movementDocument,
                    quantity: movementQuantity * -1,
                    price: i.currentStock.price,
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