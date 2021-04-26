
const { CondoThaiDataManger } = require('./CondoThaiDataManger');
const { CondoThaiWriteFile } = require('./CondoThaiWriteFile');



class CondoThaiBot {
    constructor(arg) {
        this.hostname = arg.hostname;
        this.dowloadImageFlag = false;
        this.condoThaiDataManger = new CondoThaiDataManger({
            dowloadImageFlag: this.dowloadImageFlag,
            hostname: this.hostname 
        });

        this.condoThaiWriteFile = new CondoThaiWriteFile()
    }

    async syncData(location, filename, coordinates) {

        // Fetch Data
        const condoLists = await this.condoThaiDataManger.getCondoSearchList(location, filename, coordinates);
        console.log('------- condoLists-----------', condoLists)

        // Write Data
        if (this.dowloadImageFlag) {
            this.condoThaiWriteFile.createImageDir(fileName);
        }

        // this.condoThaiWriteFile.jsonWriiter(location, filename, coordinates)
    }
}

module.exports = {
    CondoThaiBot
}