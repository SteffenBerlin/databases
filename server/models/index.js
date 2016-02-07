var db = require('../db');
var User = db.User;
var Room = db.Room;
var Message = db.Message;

module.exports = {
  messages: {
    get: function ( callback ) {
      // do MySQL query
      var query = "SELECT m.id objectId, m.text, m.createdAt, u.name username, r.name roomname FROM messages m INNER JOIN rooms r ON m.room_id = r.id INNER JOIN users u ON m.user_id = u.id";
      // send query to db
      db.query( query, function( err, results ) {
        if( err ) throw new Error( err, 'Error in /classes/messages GET' );
        // turn data into object with proper names
        // return stringified json
        callback( JSON.stringify( results ) );
      } );
    }, // a function which produces all the messages
    post: function ( body ) {
      console.log( 'message post body : ', body );
      var username = body.username;
      var roomname = body.roomname;
      var text = body.text;
      var userQuery = "INSERT IGNORE INTO users (name) VALUES (?)";
      var roomQuery ="INSERT IGNORE INTO rooms (name) VALUES (?)";
      var messageQuery = "INSERT INTO messages (text, user_id, room_id) VALUES (?, (SELECT id FROM users WHERE name = ?), (SELECT id FROM rooms WHERE name = ?) )";
      db.query( userQuery, [username], function( err ) {
        if( err ) throw new Error( err, 'Error in /classes/messages POST' );
        db.query( roomQuery, [roomname], function( err ) {
          if( err ) throw new Error( err, 'Error in /classes/messages POST room query');
          db.query( messageQuery, [text, username, roomname], function( err ) {
            if( err ) throw new Error( err, 'Error in /classes/messages POST message query');
          } );
        } );
       } );
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function ( callback ) {
      // do MySQL query
      User.findAll().then( function (users) {
        callback( JSON.stringify( users ) );
      }, function( err ) { 
        console.log( err );
      } );
    },
    post: function ( body ) {
      //body.username
      var newUser = User.build( body );
      newUser.save().then(function() {
          console.log('Insert ' + body.username + ' into users table. (yaaayyyyyyy)');
        },
        function(err) {
          console.log('This is the users post error:', err);
        }
      );
    }
  },

  rooms: {
    get: function( callback ) {
      // do MySQL query
      Room.findAll().then( function ( rooms ) {
        callback( JSON.stringify( rooms ) );
      }, function( err ) { 
        console.log( err );
      } );
    },
    post: function( body ) {
      var newRoom = Room.build( body );
      newRoom.save().then(function() {
          console.log('Insert ' + body.roomname + ' into rooms table. (yaaayyyyyyy)');
        },
        function(err) {
          console.log('This is the rooms POST error:', err);
        }
      );  
    }
  }
};

