const express = require('express');
const cors = require('cors')



const app = express();


app.use(cors());
app.use('/public', express.static('public'))

module.exports = {
    app
}