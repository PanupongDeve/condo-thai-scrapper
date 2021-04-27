const { rootDIR } = require('../../rootDIR');


const validateClientSecret = async (req, res, next) => {
    let jsonData = await require(`${rootDIR}/secret/client.json`);
    const { client_secret } = jsonData;
    if ( req.query.client_secret === client_secret) {
        next();
    } else {
        res.status(400).send({
            message: "client_secret identify fail"
        })
    }
    
    
}


module.exports = {
    validateClientSecret
}