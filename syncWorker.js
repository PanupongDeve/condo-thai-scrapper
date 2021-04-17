const { condoScraper } = require('./condo-logic');
const fs = require('fs');
const path = require('path');

const jsonWriiter = async (location, coordinates, filename) => {
    if (!fs.existsSync(path.join(__dirname, 'syncStorage', filename))){
        fs.mkdirSync(path.join(__dirname, 'syncStorage', filename));
    }
    const condoLists = await condoScraper(location, filename, coordinates);
    let data = JSON.stringify(condoLists);
    fs.writeFileSync(path.join(__dirname, 'syncStorage',  filename, `${filename}.json`), data);
}

const jsonReader = async (location) => {
    let jsonData = await require(`./syncStorage/${location}/${location}.json`);
    return jsonData;
}

const createImageDir = async (filename) => {
    if (!fs.existsSync(path.join(__dirname, 'public', 'images', filename))){
        fs.mkdirSync(path.join(__dirname, 'public', 'images',  filename));
    }
    
}
// jsonWriiter('Surat%20Thani', '9.13315:99.31573','surat_thani');

// jsonReader('Phuket');

module.exports = {
    jsonReader,
    jsonWriiter,
    createImageDir
}