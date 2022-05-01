const User = require('./User');

const findByEmeilUserService = (email) => User.findOne({ email: email });

const findByUsernameUserService = (username) => User.findOne({ username: username });

const createUserService = (body) => User.create(body);

module.exports = {
    findByEmeilUserService,
    createUserService,
    findByUsernameUserService
}