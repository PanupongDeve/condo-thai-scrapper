const express = require('express');
const cors = require('cors')
const { condoScraper } = require('./condo-logic');
const { jsonReader } = require('./syncWorker');

const app = express();

app.use(cors());
app.use('/public', express.static('public'))

app.get('/api/v1/condo-lists', async (req, res) => {
    const { location } = req.query;
    const condoLists = await jsonReader(location);

    res.status(200).json({
        data: condoLists
    })
})

app.all('*', (req, res) => {
    res.status(404).send({
        message: "Not Found"
    });
})



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server Listen PORT: ', PORT);
});
