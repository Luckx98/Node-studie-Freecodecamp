require('dotenv').config()
    var bodyParser = require("body-parser");

    let express = require('express');
    let app = express();

    console.log('Hello World')    
    let expressStatic = express.static(__dirname + '/public')

    // Normal Use
    /* app.use(expressStatic) */

    // Assets at the /public route
    /*  app.use('/public', expressStatic)  */

    // Normal Route
    app.get("/", function(req, res) {
        absolutePath = __dirname + '/views/index.html'
        res.sendFile(absolutePath)
    });
 
    // Use Routes
    /* app.get('/json', (req, res) => {
        const myEnv = process.env.MESSAGE_STYLE
        console.log(myEnv)
        if(myEnv === 'uppercase') {
           res.json({message: "HELLO JSON"});
        }else {
           res.json({message: "Hello json"}) 
        }
    }); */

    // Use middlewares
    /* app.use(function middleware(req, res, next) {
        var string = req.method + " " + req.path + " - " + req.ip;
        console.log(string)
        next();
    }); */

    // Chain Middleware
    app.get('/now', function middleware(req, res, next) {
        req.time = new Date(). toString();
        next();
    }, (req, res) => {
        res.send(({
            time: req.time
        }))
    });

    // Use params
    app.get('/:word/echo', (req, res) => {
        const { word } = req.params;
        res.json({
            echo: word
        });
    })

    // Use body parsed
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    // Get Query params
    app.route('/name').get((req, res) => {
        var firtname = req.query.first;
        var lastname = req.query.last;

        // OR you can destructure and rename the keys
        // var { first: firstName, last: lastName } = req.query;
        // Use template literals to form a formatted string
        res.json({ name: `${firtname} ${lastname}`})
    }).post(function (req, res) {
        // Use body parsed
        // console.log(req.body.first, req.body.last);
        /* res.json({
          name: `${req.body.first} ${req.body.last}`,
        }); */
          // Handle the data in the request
        var string = req.body.first + " " + req.body.last;
        res.json({ name: string });
    });

    // Use body parse
    // app.use(function middleware(req, res, next) {})

 module.exports = app;

