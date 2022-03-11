var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var db = require('monk')('localhost:27017/E-CommerceDB');

/* GET home page. */
router.get('/', function(req, res, next) {
  var categories = db.get('categories');
  categories.find({}, {}, function (err, category) {
    res.render('index', { categories: category });
  })
});

module.exports = router;
