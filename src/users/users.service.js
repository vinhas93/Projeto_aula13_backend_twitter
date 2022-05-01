const User = require('./User');

const findByEmeilUserService = (email) => User.findOne({ email: email });

const findByUsernameUserService = (username) => User.findOne({ username: username });

const createUserService = (body) => User.create(body);

const findAllUserService = () => User.find()

const findByIdUserService = (idUser) => User.findById(idUser)

module.exports = {
    findByEmeilUserService,
    createUserService,
    findByUsernameUserService,
    findAllUserService,
    findByIdUserService,
}