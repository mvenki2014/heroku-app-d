var express = require('express');
var router = express.Router();
var {Client} = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
});
/*const pool = new Pool({
    user: 'rtdgwuicrlspms',
    host: 'ec2-54-197-239-115.compute-1.amazonaws.com',
    database: 'postgresql-reticulated-12689',
    // database: 'd9abmah4kjopuk',
    password: '361e7db96571053d67a3ac4319610b4e9177c663f844f2a9ca576a1fa7c84e61',
    port: 5432,
});
const db = new Client({
    user: 'rtdgwuicrlspms',
    host: 'ec2-54-197-239-115.compute-1.amazonaws.com',
    database: 'postgresql-reticulated-12689',
    // database: 'd9abmah4kjopuk',
    password: '361e7db96571053d67a3ac4319610b4e9177c663f844f2a9ca576a1fa7c84e61',
    port: 5432,
});
db.connect();*/

client.connect();
router.get('/getuser', function (req, res) {
    res.setHeader('content-type', 'application/json');
    client.query('SELECT * from reg_users', (err, dbRes) => {
        console.log(err, dbRes);
        res.send({
            type: 'GET',
            data: [
                dbRes.rows
            ]
        });
        // client.end()
    });
});
router.post('/postuser', function (req, res) {
    res.setHeader('content-type', 'application/json');
    console.log(req.body);
    res.send({
        type: 'POST',
        data: [
            req.body.name,
            req.body.phone,
        ]
    });
});

/* GET home page. */
router.get('/', function (req, res, next) {
    res.setHeader('content-type', 'application/json');
    res.send({type: "GET", data: 'Welcome to heroku nodejs by GET Request'})
});

router.post('/', function (req, res, next) {
    res.setHeader('content-type', 'application/json');
    res.send({type: "post", data: 'Welcome to heroku nodejs by POST Request'})
});


module.exports = router;
