require('dotenv').config();
const jwt = require('jsonwebtoken');
const { findByIdUserService } = require('../users/users.service');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization; // de onde vem a autorization??

  if (!authHeader) {
    return res.status(401).send({ message: 'O token não foi informado!' });
  }

  const parts = authHeader.split(' '); // ["Bearer", "token"]

  if (parts.length !== 2) {
    return res.status(401).send({ message: 'Token inválido 1' });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ message: 'Token mal formatado!' });
  }

  jwt.verify(token, process.env.SECRET, async (err, decoded) => {
    const user = await findByIdUserService(decoded.id);

    if (err || !user || !user.id) {
      console.log(err, user, user.id);
      return res.status(401).send({ message: 'Token inválido' });
    }

    req.userId = user.id;

    return next();
  });
};
