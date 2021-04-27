const express = require('express');
const apiV1Controller = express.Router();
const { tokenController } = require('./token');

const api_path = '/api/v1'

apiV1Controller.use(api_path, tokenController)

module.exports = {
    apiV1Controller
}