var db = require('../db');

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
      var query = "SELECT id, name username FROM users";
      // send query to db
      db.query( query, function( err, results ) {
        if( err ) throw new Error( err, 'Error in /classes/users GET' );
        // turn data into object with proper names
        // return stringified json
        callback( JSON.stringify( results ) );
      } );
    },
    post: function ( body ) {
      var username = body.username;
      var query = "INSERT IGNORE INTO users (name) VALUES ('" + username + "')";
      db.query( query, function( err ) {
        if( err ) throw new Error( err, 'Error in /classes/users POST' );
      } );
    }
  },

  rooms: {
    get: function( callback ) {
      // do MySQL query
      var query = "SELECT id, name roomname FROM rooms";
      // send query to db
      db.query( query, function( err, results ) {
        if( err ) throw new Error( err, 'Error in /classes/rooms GET' );
        // turn data into object with proper names
        // return stringified json
        callback( JSON.stringify( results ) );
      } );
    },
    post: function( body ) {
      var roomname = body.roomname;
      var query = "INSERT IGNORE INTO rooms (name) VALUES ('" + roomname + "')";
      db.query( query, function( err ) {
        if( err ) throw new Error( err, 'Error in /classes/rooms POST' );
      } );    
    }
  }
};

