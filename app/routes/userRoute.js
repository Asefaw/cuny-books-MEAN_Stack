var User = require('../models/user');

function getUsers(res) {
    User.find(function (err, users) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(users); // return all todos in JSON format
    });
};

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/users', function (req, res) {
        // use mongoose to get all todos in the database
        getUsers(res);
    });

    // create todo and send back all todos after creation
    app.post('/api/users', function (req, res) {

        // create a todo, information comes from AJAX request from Angular
        User.create({
            fullName: req.body.fullName,
            email: req.body.email,
            password: req.body.password,
            college: req.body.college, 
        }, function (err, user) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getUsers(res);
        });

    });
    app.get('/api/user/:id', function(req, res){
        User.findById(req.params.id, function(err, user){
            if(err)
                res.json(err);
            res.json(user);
        });
    });

    // delete a todo
    app.delete('/api/users/:user_id', function (req, res) {
        Todo.remove({
            _id: req.params.user_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            getUsers(res);
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/views/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
