const Tweet = require('./Tweet');

const createTweetService = (message, userId) =>
  Tweet.create({ message, user: userId });

const findAllTweetsService = () =>
  Tweet.find().sort({ _id: -1 }).populate('User');

module.exports = { createTweetService, findAllTweetsService };
