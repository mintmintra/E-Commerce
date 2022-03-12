var express = require('express');
var router = express.Router();
var { check, validationResult } = require('express-validator');

var mongodb = require('mongodb');
var db = require('monk')('localhost:27017/E-CommerceDB');

/* GET home page. */
router.get('/add', function (req, res, next) {
    res.render("addproduct");
});


module.exports = router;
