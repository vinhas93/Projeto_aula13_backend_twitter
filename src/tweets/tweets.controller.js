const tweetService = require('./tweets.service');

const createTweetController = async (req, res) => {
  try {
    console.log('olá');
    const { message } = req.body;

    if (!message) {
      res.status(400).send({
        message: 'Envie todos os dados necessários para a criação do Tweet.',
      });
    }
    console.log('olá 2' + req.userId);

    const { id } = await tweetService.createTweetService(message, req.userId);

    console.log('olá 3');
    return res.status(201).send({
      message: 'Tweet Criado com sucesso',
      tweet: { id, message },
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findAllTweetsController = async (req, res) => {
  try {
    let { limit, offset } = req.query;

    limit = Number(limit);
    offset = Number(offset);

    if (!limit) {
      limit = 5;
    }

    if (!offset) {
      offset = 0;
    }

    const tweets = await tweetService.findAllTweetsService(offset, limit);

    const total = await tweetService.countTweets();

    const currentUrl = req.baseUrl;

    const next = offset + limit;
    const nextUrl =
      next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

    const previus = offset - limit < 0 ? null : (offset = limit);
    const previusUrl =
      previus != null ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

    if (tweets.length === 0) {
      return res.status(404).send({ message: 'Não existem tweets!' });
    }

    return res.send({
      nextUrl,
      previusUrl,
      limit,
      offset,
      total,
      results: tweets.map((tweet) => ({
        id: tweet._id,
        message: tweet.message,
        likes: tweet.likes.length,
        comments: tweet.comments.length,
        retweets: tweet.retweets.length,
        name: tweet.user.name,
        username: tweet.user.username,
        avatar: tweet.user.avatar,
      })),
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const searchTweetController = async (req, res) => {
  try {
    const { message } = req.query;

    const tweets = await tweetService.searchTweetService(message);

    if (tweets.length === 0) {
      return res
        .status(404)
        .send({ message: 'não existem Tweets com essa mensagem' });
    }

    return res.send({
      tweets: tweets.map((tweet) => ({
        id: tweet._id,
        message: tweet.message,
        likes: tweet.likes.length,
        comments: tweet.comments.length,
        retweets: tweet.retweets.length,
        name: tweet.user.name,
        username: tweet.user.username,
        avatar: tweet.user.avatar,
      })),
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const likeTweetController = async (req, res) => {
  const { id } = req.params;

  const userId = req.userId;

  const tweetLiked = await tweetService.likeTweetService(id, userId);

  if (tweetLiked.lastErrorObject.n === 0) {
    return res.status(400).send({ message: 'Você já deu like neste Tweet!' });
  }

  return res.send({ message: 'Like realizado com sucesso!' });
};

const commentTweetController = async (req, res) => {
  const { id } = req.params;

  const userId = req.userId;

  await tweetService.commentTweetService(id, userId);

  return res.send({ message: 'Comentário realizado com sucesso!' });
};

const retweetTweetController = async (req, res) => {
  const { id } = req.params;

  const userId = req.userId;

  const retweet = await tweetService.retweetTweetService(id, userId);

  if (retweet.lastErrorObject.n === 0) {
    return res.status(400).send({ message: 'Você já retweetou este Tweet!' });
  }

  return res.send({ message: 'Retweet realizado com sucesso!' });
};

module.exports = {
  createTweetController,
  findAllTweetsController,
  searchTweetController,
  likeTweetController,
  retweetTweetController,
  commentTweetController,
};
