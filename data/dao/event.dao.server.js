const eventModel = require('../models/event/event.model.server');

function createEvent(event){
    return eventModel.create(event);
}

function deleteEvent(eventId) {
    return eventModel.remove({_id:eventId});
}

function updateEvent(event){
    return eventModel.updateOne({_id:event._id},event)
}

module.exports = {

    createEvent,
    deleteEvent,
    updateEvent


};