require('dotenv').config();
const express = require('express');
const cors = require('cors');

const port = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	res.send({ message: `Hello, World!` });
});

app.listen(port, () => {
	console.log(`servidor rodando na porta ${port}`);
});
