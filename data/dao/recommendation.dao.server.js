const recommendationModel = require('../models/recommendation/recommendation.model.server');


function deleteRec(id){
    return movieRecommendedModel.remove({user:id})
}
module.exports = {
    deleteRec

};