var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 100,
    host: "localhost",
    user: "root",
    password: "",
    database: "loc",
    debug: false
});
app.get('/show', function (req, res) {
    res.sendFile(__dirname + '/show.html');

});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/getloc.html');
});
app.post('/sendloc', function (req, res) {
    var lat = req.body.lat;
    var long = req.body.long;

    add_result(lat, long, function (ress) {
        if (ress) {

            io.emit('location', { lat: lat, long: long });
            res.sendStatus(200);
        }



    });

});


var add_result = function (lat, long, cb) {
    pool.getConnection(function (err, con) {
        if (err) {

            cb(false);
            return;
        }

        con.query("INSERT INTO `loc` ( `lat`, `long`) VALUES (" + lat + "," + long + ")", function (err) {

            if (!err) {
                cb(true);
            }

        });




        con.on('error', function (err) {
            cb(false);
            return;
        });

    });

}


server.listen(8080);