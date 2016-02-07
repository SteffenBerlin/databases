var db = require('../db');
var User = db.User;
var Room = db.Room;
var Message = db.Message;

module.exports = {
  messages: {
    get: function ( callback ) {
      Message.findAll({
        include: [{ model: User }, { model: Room }]
      }).then( function( messages ) {
        callback( JSON.stringify( messages ) );  
      },
      function( err ) { 
        console.log( err );
      } );
    }, // a function which produces all the messages
    post: function ( body ) {
      // find or create user, save ID
      User.findOrCreate( { where: { username: body.username } })
      .spread( function( user ) {
        var userId = user.id;
        // find or create room, save ID
        Room.findOrCreate({where: {roomname: body.roomname}})
        .spread( function( room ) { 
          var roomId = room.id;
          // create message with IDs
          var params = {
            text: body.text,
            user_id: userId,
            room_id: roomId
          };
          var newMessage = Message.build( params );
          newMessage.save().then(function(){
            console.log('saved message successfully', body);
          },
          function(err){
            console.log(err);
          }
          );
        } );
      });
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

