const Tweet = require('./Tweet');

const createTweetService = (message, userId) =>
  Tweet.create({ message, user: userId });

const findAllTweetsService = () =>
  Tweet.find().sort({ _id: -1 }).populate('user');

const searchTweetService = (message) =>
  Tweet.find({
    message: { $regex: `${message || ''}`, $options: 'i' },
  })
    .sort({ _id: -1 })
    .populate('user');

const likeTweetService = (id, userId) =>
  Tweet.findOneAndUpdate(
    {
      _id: id,
      'likes.userId': { $nin: [userId] },
    },
    {
      $push: {
        likes: { userId, created: new Date() },
      },
    },
    {
      rawResult: true,
    }
  );

const commentTweetService = (id, userId) =>
  Tweet.findOneAndUpdate(
    { _id: id, 'comments.userId': { $nin: [userId] } },
    {
      $push: {
        comments: { userId, created: new Date() },
      },
    },
    {
      rawResult: true,
    }
  );

const retweetTweetService = (id, userId) =>
  Tweet.findOneAndUpdate(
    { _id: id },
    {
      $push: {
        retweets: { userId, created: new Date() },
      },
    },
    {
      rawResult: true,
    }
  );

module.exports = {
  createTweetService,
  findAllTweetsService,
  searchTweetService,
  likeTweetService,
  commentTweetService,
  retweetTweetService,
};
