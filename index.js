require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const routes = require('./routes');
const { errorHandler } = require('./middlewares/errorHandler');

app.use(cors());

app.use(express.json());

app.use('/', routes);

app.use(errorHandler);

const PORT = process.env.APP_PORT;
app.listen(PORT, () => {
    console.log('Server is running on port: ' + PORT);
});
