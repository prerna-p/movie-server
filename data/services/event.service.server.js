module.exports = app =>{


    app.post('/api/event', createEvent);
    app.put('/api/event', updateEvent);
    app.delete('/api/event/:eventId', deleteEvent);
    app.get('/api/events', findAllEventOfUser);
    
    const eventDao = require('../dao/event.dao.server');
    
    
    function createEvent(req,res){
        
    }
    
    function updateEvent(req,res){
        
    }
    
    function deleteEvent(req,res) {
        
    }

    function findAllEventOfUser(req,res) {

    }
};