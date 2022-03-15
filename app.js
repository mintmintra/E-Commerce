var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongodb = require('mongodb');
var db = require('monk')('localhost:27017/E-CommerceDB');

var indexRouter = require('./routes/index');
var categoryRouter = require('./routes/categories');
var productRouter = require('./routes/products');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.locals.descriptionText = function (text, length) {
    return text.substring(0, length);
}

app.locals.formatMoney = function(number){
    return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

app.use('/', indexRouter);
app.use('/categories', categoryRouter);
app.use('/products', productRouter);



module.exports = app;
