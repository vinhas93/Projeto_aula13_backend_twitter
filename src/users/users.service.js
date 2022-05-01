const User = require('./User');

const findByEmeilUserService = (email) => User.findOne({ email: email });

const createUserService = (body) => User.create(body);

module.exports = {
    findByEmeilUserService,
    createUserService
}