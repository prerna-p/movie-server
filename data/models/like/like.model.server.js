const mongoose = require('mongoose');
const likeSchema = require('./like.schema.server');
module.exports = mongoose.model('LikeModel',likeSchema);