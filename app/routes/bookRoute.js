var Book = require('../models/book');

function getBooks(res) {
    Book.find(function (err, books) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(books); // return all todos in JSON format
    });
};

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/books', function (req, res) {
        // use mongoose to get all todos in the database
        getBooks(res);
    });

    // create todo and send back all todos after creation
    app.post('/api/books', function (req, res) {

        // create a todo, information comes from AJAX request from Angular
        Book.create({
            owner: req.body.owner,
            title: req.body.title,
            isbn: req.body.isbn,
            author: req.body.author,
            edition: req.body.edition,
            price: req.body.price,
            quantity: req.body.quantity,
        }, function (err, book) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getUsers(res);
        });

    });

    // delete a todo
    app.get('/api/searchAll', function (req, res) {
        Book.find(
            {$text : { $search : req.body.title}}
        ).select('-_id').exec(function(err, results) {
            console.log(err);
            if(results.length){
                var data = JSON.parse(JSON.stringify(results));
                console.log(data);
                res.json(data);
            } 
             
        });
    });
    app.get('/api/books/:id', function(req, res){
        Book.findById(req.params.id, function(err, book){
            if(err) 
                res.json(err);
            res.json(book);
        });
    });

    // application -------------------------------------------------------------
    // app.get('*', function (req, res) {
    //     res.sendFile(__dirname + '/public/views/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    // });
};
