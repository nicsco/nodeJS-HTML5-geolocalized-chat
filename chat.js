var app = require('http').createServer(handler);
app.listen(8000);
var io = require('socket.io').listen(app);
var redis = require('redis');
var fs = require('fs');

function handler(req,res){
    fs.readFile(__dirname + '/index.html', function(err,data){
        if(err){
            res.writeHead(500);
            return res.end('Error loading index.html');
        }
        res.writeHead(200);
        console.log("Listening on port 8000");
        res.end(data);
    });
}

var pub = redis.createClient();
var sub = redis.createClient();
var room = '0,0';
sub.subscribe("chatting");

io.sockets.on('connection', function (client) {

    client.on('locale', function(localRoom) {
		room = localRoom;
		client.room = redis.createClient();
		client.room.subscribe( room );
		console.log( room );
		client.room.on("message", function (channel, message) {
			console.log("message received in room!");
			client.emit('reply', JSON.parse( message ) );
		});

		if ( '419,125' == localRoom ){
			client.emit('info', "If you're still nearby at launch, why don't yout try eating at <b>Caffetteria Tudini</b> with <a href='http://www.appeatit.com/' target='_blank'><b>AppEat.it</b></a>?" );
		}

    });


    sub.on("message", function (channel, message) {
        console.log("message received on server from publish ");
        console.log(message);

		client.emit('reply', JSON.parse( message ) );
    });

	client.on('message', function (message) {

		pub.publish( room, JSON.stringify( message ) );
//		pub.publish( 'chatting', JSON.stringify( message ) );

		console.log( '-' );
		console.log( 'this is the received message:' );
        console.log(message);
    });


    client.on('disconnect', function () {
		client.room.quit();
        sub.quit();
        pub.publish("chatting",'User ' + client.id + ' is disconnected');
    });

  });