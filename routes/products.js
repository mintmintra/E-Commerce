var express = require('express');
var router = express.Router();
var { check, validationResult } = require('express-validator');

var mongodb = require('mongodb');
var db = require('monk')('localhost:27017/E-CommerceDB');

/* GET home page. */
router.get('/add', function (req, res, next) {
    var categories = db.get('categories');
    categories.find({}, {}, function (err, category) {
        res.render('addproduct', {
            categories: category
    });
  })
});

router.get('/show/:id', function(req, res, next) {
  var categories = db.get('categories');
    var products = db.get('products');
  products.find(req.params.id, {}, function(err, product) {
    categories.find({}, {}, function(err, category) {
      res.render('show', {
        categories: category,products:product
      });
    })
  })
});

router.post('/add', [
    check('name','กรุณาป้อนชื่อสินค้า').not().isEmpty(),
    check('description', 'กรุณาป้อนรายละเอียดสินค้า').not().isEmpty(),
    check('price', 'กรุณาป้อนราคาสินค้า').not().isEmpty(),
    check('img','กรุณาป้อนภาพสินค้า').not().isEmpty()
], function(req, res, next) {
    var result = validationResult(req);
    var errors = result.errors;
    var categories = db.get('categories');
    var products = db.get('products');
    if (!result.isEmpty()) {
        categories.find({}, {}, function (err, category) {
        res.render('addproduct', {
            categories: category, errors: errors
        });
    })
    } else {
        //Insert Data
        products.insert({
            name: req.body.name,
            description: req.body.description,
            price: parseFloat(req.body.price),
            category: req.body.category,
            img: req.body.img
        }, function (err, success) {
            if (err) {
                res.send(err);
            } else {
                res.location('/');
                res.redirect('/');
            }
        })
    }
});


module.exports = router;
