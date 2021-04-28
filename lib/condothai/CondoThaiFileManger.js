const fs = require('fs');
const path = require('path');
const { rootDIR } = require('../../rootDIR');

class CondoThaiFileManger {

    constructor(arg) {
        this.synceStorageName = arg.synceStorageName
    }

    createImageDir() {

    }

    writeJson(filename, data) {
        console.log(`Writing ${filename}.json ......................`);
        if (!fs.existsSync(path.join(rootDIR, this.synceStorageName, filename))){
            fs.mkdirSync(path.join(rootDIR, this.synceStorageName, filename));
        }

        let dataStringify = JSON.stringify(data);
        fs.writeFileSync(path.join(rootDIR, this.synceStorageName ,  filename, `${filename}.json`), dataStringify);
    }

    async readJson(filename) {
        let jsonData = await require(`${rootDIR}/${this.synceStorageName}/${filename}/${filename}.json`);
        return jsonData;
    }
}

module.exports = {
    CondoThaiFileManger
}