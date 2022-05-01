require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connectDatabase = require('./database/database');
const userRoute = require('./users/users.route');

const port = process.env.PORT || 3001;
const app = express();

connectDatabase();

app.use(cors());
app.use(express.json());

app.use('/users', userRoute);

app.listen(port, () => {
	console.log(`servidor rodando na porta ${port}`);
});
