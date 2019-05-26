var express = require('express');
var router = express.Router();
var {Client} = require('pg');
var nodemailer = require('nodemailer');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
});

/*
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'root',
    port: 5432,
});
*/

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,  //true for 465 port, false for other ports
    service: 'gmail',
    auth: {
        user: 'venkatesh.m@fininfocom.com',
        pass: 'Venkisingle123?'
    }
});

function sendmail(req, res) {
    var mailOptions = {
        from: 'venkatesh.m@fininfocom.com',
        to: req.body.email,
        subject: 'Sending Email using Node.js',
        text: 'That was easy!',
        html: '<h1>Thank you..!</h1>' +
            '<p>Your application submited success.<br>' +
            'We will contant you soon</p>'
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('Mail has Error' + error);
            res.redirect('/404.html');
        } else {
            console.log('Email sent: ' + info.response);
            res.redirect('/thank-you.html');
        }

    });
}

client.connect();
router.get('/getuser', function (req, res) {
    client.query('SELECT * from reg_users', (err, dbRes) => {
        res.send({
            type: 'GET',
            data: [
                dbRes.rows
            ]
        });
    });
});
router.post('/postuser', function (req, res) {
    if (req.body.submit === 'submit') {
        client.query("INSERT INTO reg_users (name, email, phone, status) VALUES ($1, $2, $3, 'Active') RETURNING id",
            [req.body.f_name + ' ' + req.body.l_name, req.body.email, req.body.phone], (err, dbRes) => {
                if (err) {
                    res.send({status: 500, msg: err});
                } else {
                    console.log('row inserted with id: ' + dbRes.rows[0].id);
                    /*res.send({
                        status: 'Success',
                        msg: 'row inserted with id: ' + dbRes.rows[0].id,
                    });*/
                    sendmail(req, res);
                }

            });
    } else {
        res.send({
            type: 'POST',
            msg: 'Invalid Request',
        })
    }
});

/* GET home page. */
router.get('/', function (req, res, next) {
    //res.setHeader('content-type', 'application/json');
    res.send({type: "GET", data: 'Welcome to heroku nodejs by GET Request'})
});

router.post('/', function (req, res, next) {
    // res.setHeader('content-type', 'application/json');
    res.send({type: "post", data: 'Welcome to heroku nodejs by POST Request'})
});


module.exports = router;
