const mongoose = require('mongoose');

const connectDatabase = () => {
	console.log(`conectando ao bando de dados...`);

	mongoose
		.connect(process.env.DATABASE_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => console.log(`MongoDB Conectado!`))
		.catch((err) => console.log(`Erro ao conectar com o banco: ${err}`));
};

module.exports = connectDatabase;
