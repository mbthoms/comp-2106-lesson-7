var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Article = require('../models/article');

// set up the GET handler for the main articles page
router.get('/', function(req, res, next) {
    // use the article model to query the articles collection in the db

    // use the Article model to retrieve all articles
    Article.find(function (err, articles) {
        // if we have an error
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            // we got data back
            // show the view and pass the data to it
            res.render('articles/index', {

                title: 'Articles',
                articles: articles
            });
        }
    });
});

//GET handler for add to display a blank form.
router.get('/add', function(req, res, next) {
    res.render('articles/add', {
        title: 'Add a new Article'
    });
});

//POST  handler for add to process the form.
router.post('/add', function(req, res, next) {

    //Save a new article
    Article.create(
        {
            title: req.body.title,
            content: req.body.content
        }
    );

    //redirect to main articles.
    res.redirect('/articles');
});

// make public
module.exports = router;
