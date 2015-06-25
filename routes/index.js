var express = require('express');
var router = express.Router();
var models = require('../models')
/* GET home page. */
router.get('/', function(req, res, next) {

  models.Page
    .find()
    .exec()
    .then(function(pages) {
      res.render('index', {pages: pages})
    })
    .then(null, next)
 
});

router.get('/new', function(req, res, next) {
  res.render('add')
})

router.get('/:url_title', function(req, res, next) {
console.log("here")
  models.Page
    .findOne({ url_name: req.params.url_title })
    .exec()
    .then(function(page) {
      if (!page){ return next()};
      res.render('show', page)
    })
    .then(null, next);

}) //get a single post

router.get('/wiki/tags/:tag', function(req, res, next) {

  models.Page
    .findOne({ url_name: req.params.url_title })
    .exec()
    .then(function(page) {
      res.render('show', page)
    })
    .then(null, next)

}) //get a single post

router.post('/add/submit', function(){
  var models = require("../models/index.js");
  var urlName;
  if(typeof req.body.pageTitle != "undefined" && req.body.pageTitle !== ""){
    urlName = req.body.pageTitle.toLowerCase().replace(/ /gi,"_");
  }else{
    urlName = Math.random().toString(36).substring(2,7);
  }

  var page = new models.Page({"title": req.body.pageTitle, "content":req.body.content, "url_name": urlName});
  page.save();
  //res.send(page);
  res.redirect("/");
}) //update


router.get('/:id/delete') //remove

router.post('/', function(req, res, next) {



  console.log('req.body', req.body)
  models.Page
    .create(req.body)
    .then(function(page) {
      res.status(201).json(page)
    })
    .then(null, next)

}) //create a post



module.exports = router;







