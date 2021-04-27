const fs = require('fs');
const path = require('path');
const { rootDIR } = require('../../rootDIR');

class CondoThaiWriteFile {

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
}

module.exports = {
    CondoThaiWriteFile
}