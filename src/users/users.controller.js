const userService = require('./users.service');

const createUserController = async (req, res) => {
	const { username, name, email, password, avatar } = req.body;

	if (!username || !name || !email || !password || !avatar) {
		return res.status(400).send({
			message:
				'Existe um ou mais campos em branco. Por favor preencha todos os campos.',
		});
	}

	const foundUser = await userService.findByEmeilUserService(email);

	if (foundUser) {
		return res.status(400).send({ message: 'Usuário já existe!' });
	}

	const user = await userService
		.createUserService(req.body)
		.catch((err) => console.log(err, { message: 'Erro ao criar usuário!' }));

	if (!user) {
		return res.status(400).send({ message: 'Erro ao criar usuário! 2.0' });
	}

	res.status(201).send(user);
};
const findAllUserController = async (req, res) => {
	res.send({ message: 'Find All OK' });
};

module.exports = {
	createUserController,
	findAllUserController,
};
