module.exports = app =>{


    app.post('/api/event', createEvent);
    app.put('/api/event', updateEvent);
    app.delete('/api/event/:eventId', deleteEvent);
    app.get('/api/events', findAllEventsOfUser);
    
    const eventDao = require('../dao/event.dao.server');
    const userDao = require('../dao/user.dao.server');

    
    function createEvent(req,res){
        let user = req.session.currentUser;
        eventDao.createEvent(req.body)
            .then(response => {
                userDao.updateUserEvent(user._id, response)
                    .then(response1 => res.sendStatus(200))
            });
    }
    
    function updateEvent(req,res){
        eventDao.updateEvent(req.body)
            .then((response) => res.send("Event updated"));
        
    }
    
    function deleteEvent(req,res) {
        let eventId = req.params['eventId'];
        let user = req.session.currentUser;
        eventDao.deleteEvent({_id: eventId})
            .then(() => {
                userDao.deleteEventofUser({_id: user._id}, {_id: eventId})
                    .then(() => res.sendStatus(200))
            })
        
    }

    function findAllEventsOfUser(req,res) {
        let user = req.session.currentUser;
        userDao.findAllEventsOfUser(user)
            .then(response => res.json(response));

    }
};