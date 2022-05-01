const createUserController = async (req, res) => {
	res.send({ message: 'Create OK' });
};
const findAllUserController = async (req, res) => {
	res.send({ message: 'Find All OK' });
};

module.exports = {
	createUserController,
	findAllUserController,
};
