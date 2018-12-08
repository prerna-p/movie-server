const recommendationModel = require('../models/recommendation/recommendation.model.server');


function deleteRec(id){
    return recommendationModel.remove({user:id})
}
module.exports = {
    deleteRec

};