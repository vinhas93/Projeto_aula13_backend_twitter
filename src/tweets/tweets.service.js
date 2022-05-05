const Tweet = require('./Tweet');

const createTweetService = (message, userId) =>
  Tweet.create({ message, user: userId });

module.exports = { createTweetService };
