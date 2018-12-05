const mongoose = require('mongoose');
const recommendationSchema = require('./recommendation.schema.server');
module.exports = mongoose.model('RecommendationModel',recommendationSchema);