const User = require('./User');
const Post = require('./Post');

// create association from post to user, creating a one to many relation. post can only belong
// to one user, not many (constraint defined below)
User.hasMany(Post, {
    foreignKey: 'user_id'
  });

module.exports = { User, Post };