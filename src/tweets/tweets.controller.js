const tweetService = require('./tweets.service');

const createTweetController = async (req, res) => {
  try {
    console.log("olá")
    const { message } = req.body;

    if (!message) {
      res.status(400).send({
        message: 'Envie todos os dados necessários para a criação do Tweet.',
      });
    }
    console.log("olá 2" + req.userId)

    const { id } = await tweetService.createTweetService(message, req.userId);

    console.log("olá 3")
    return res.status(201).send({
      message: 'Tweet Criado com sucesso',
      tweet: { id, message },
    });

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = { createTweetController };
