var Sequelize = require( 'sequelize' );
var db = new Sequelize( 'chat', 'root', '' );

var User = db.define( 'users', {
  username: { type: Sequelize.STRING, unique: true } // make this unique
});

var Room = db.define( 'rooms', {
  roomname: { type: Sequelize.STRING, unique: true }// make this unique
});

var Message = db.define( 'messages', {
  text: Sequelize.STRING,
  user_id: Sequelize.INTEGER,
  room_id: Sequelize.INTEGER
});

User.sync();
Room.sync();
Message.sync();

exports.User = User;
exports.Room = Room;
exports.Message = Message;