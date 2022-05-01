const userService = require('./users.service');

const createUserController = async (req, res) => {
	const { username, name, email, password, avatar } = req.body;

	if (!username || !name || !email || !password || !avatar) {
		return res.status(400).send({
			message:
				'Existe um ou mais campos em branco. Por favor preencha todos os campos.',
		});
	}

	const foundUserEmail = await userService.findByEmeilUserService(email);
	const foundUsername = await userService.findByUsernameUserService(username);

	if (foundUserEmail || foundUsername) {
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
	const users = await userService.findAllUserService();

	if (users.length === 0) {
		return res.status(400).send({
			message: 'Não existem usuários cadastrados!',
		});
	}

	res.send(users);
};

module.exports = {
	createUserController,
	findAllUserController,
};
