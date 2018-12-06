module.exports = app =>{

    app.post('/api/register',register);
    app.post('/api/login', login);
    app.post('/api/logout', logout);
    app.get('/api/profile', profile);
    app.put('/api/profile', updateProfile);
    app.get('/api/user', findAllUsers);
    app.get('/api/user/:userId', findUserById);
    app.post('/api/user', createUser);


    const userDao = require('../dao/user.dao.server');

    function register(req,res){
        let newUser = req.body;
        userDao.findUserByUserName(newUser.username).then(
            (response) => {
                if(response=== null){
                    userDao.createUser(newUser).then(
                        (user) => {
                            req.session['currentUser']={_id: user._id,username: user.username,
                            type: user.type};
                            res.sendStatus(200);
                        }
                    );
                }
                else{
                    res.sendStatus(500);
                }
            }
        );
    }


    function login(req,res){
        userDao.findUserByCredentials(req.body)
            .then((user) => {
                if(user == null){
                    res.sendStatus(501);
                }
                else{
                    req.session['currentUser'] = user;
                    req.session['userId'] = user._id;
                    req.session['userType'] = user.userType;
                    res.json(user);
                }
            })
    }

    function logout(req,res){
        req.session.destroy();
        req.session = null;
        res.sendStatus(200);
    }
    
    function profile(req,res){
        userDao.findUserById(req.session['userId']).
            then(user => res.send(user));
    }
    
    function updateProfile(req,res){
        let user = req.body;
        userDao.findUserById(req.session['currentUser']._id).then(response =>{
            if(response.username===user.username){
                userDao.updateUser(req.session['currentUser']._id,user).then(
                    response=> res.sendStatus(200)
                );
            }
            else{
                userDao.findUserByUserName(user.username).then(response => {
                    if(response===null) {
                        userDao.updateUser(req.session['currentUser']._id,user)
                            .then(response=> res.sendStatus(200)
                            );
                    }
                    else{
                        res.sendStatus(500);
                    }
                })
            }
        })
    }
    
    function findAllUsers(req,res) {
        userDao.findAllUsers().then(
            users => res.send(users)
        )
    }
    
    function findUserById(req,res) {
        userDao.findUserById(req.session['userId']).then(
            (user) => res.send(user)
        )
    }
    
    function createUser(req,res) {
        let newUser = req.body;
        userDao.findUserByUserName(newUser.username).then(
            (response) =>{
                if(response === null){
                    userDao.createUser(newUser).then(
                        (user) =>{
                            req.send['currentUser'] = user;
                            res.send(user);
                        }
                    )
                }
                else {
                    res.sendStatus(500);
                }
            }
        )

    }

};