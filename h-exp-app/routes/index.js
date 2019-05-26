var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.setHeader('content-type', 'application/json');
    res.send({type: "GET", data: 'Welcome to heroku nodejs by GET Request'})
});
/*
router.post('/', function (req, res, next) {
    res.setHeader('content-type', 'application/json');
    res.send({type: "post", data: 'Welcome to heroku nodejs by POST Request'})
});*/
module.exports = router;
