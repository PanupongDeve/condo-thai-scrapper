const express = require('express');
const cors = require('cors')

const { validateClientSecret } = require('../middlewares/validateClientSecret');
const { apiV1Controller } = require('../api/v1');

const app = express();


app.use(cors());
app.use(validateClientSecret);
app.use('/public', express.static('public'))
app.use(apiV1Controller);

module.exports = {
    app
}