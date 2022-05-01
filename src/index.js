require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDatabase = require('./database/database');

const port = process.env.PORT || 3001;
const app = express();

connectDatabase()

app.use(cors());
app.use(express.json());


app.listen(port, () => {
	console.log(`servidor rodando na porta ${port}`);
});
