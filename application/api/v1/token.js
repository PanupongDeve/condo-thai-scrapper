const express = require('express');
const tokenController = express.Router();


tokenController.get('/token', (req, res) => {

    res.send({
        message: "Success"
    })
});


module.exports = {
    tokenController
}