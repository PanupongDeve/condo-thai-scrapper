const _ = require('lodash');
const { CondoThaiDataManger } = require('./CondoThaiDataManger');
const { CondoThaiFileManger } = require('./CondoThaiFileManger');



class CondoThaiBot {
    constructor(arg) {
        this.hostname = arg.hostname;
        this.dowloadImageFlag = false;
        this.condoThaiDataManger = new CondoThaiDataManger({
            dowloadImageFlag: this.dowloadImageFlag,
            hostname: this.hostname 
        });

        this.condoThaiFileManger = new CondoThaiFileManger({
            synceStorageName: 'syncStorage'
        })
    }

    async syncData(location, filename, coordinates) {

        // Fetch Data
        const condoLists = await this.condoThaiDataManger.getCondoSearchList(location, filename, coordinates);
        console.log('------- condoLists-----------', condoLists)

        // Write Data
        if (this.dowloadImageFlag) {
            this.condoThaiFileManger.createImageDir(fileName);
        }

        console.log('----------- filename --------', filename)

        this.condoThaiFileManger.writeJson(filename, condoLists)
    }

    async syncAll() {
        const batchs = await require('../../batch.json');
        batchs.forEach(async (batch) => {
            await this.syncData(batch.location, batch.fileName, batch.coordinates);
        })

    }

    async generateMessageFacebookAutoPost(fileName) {
        let message = "";
        let condoLists  = await this.getCondoByLocationFilename(fileName);
        condoLists = _.shuffle(condoLists)
        condoLists = condoLists.slice(0,11);
        condoLists.forEach((condo) => {

            message = message.concat(`\n---สถานที่: ${condo.projectTitle}------------\n`);
            condo.rooms.forEach((room) => {
                message = message.concat(`🔺ห้อง: ${room.title}\n`);
                message = message.concat(`${room.roomPrice.rentPerMouth}\n`);
                message = message.concat(`${room.roomPrice.sale || "-"}\n`);
                message = message.concat(`รายละเอียดเพิ่มเติม: ${room.figure.href || "-"}\n\n`);
            })
            message = message.concat(`\n--------------------------------------\n`);
        })
        return message;
    }

    async getCondoByLocationFilename(filename) {
        return await this.condoThaiFileManger.readJson(filename);
    }

    async generateMessageFacebookOnlyRoom(room) {
        let message = "";
        message = message.concat(`🔺🔺ห้อง: ${room.title}🔺🔺\n`);
        message = message.concat(`💲${room.roomPrice.rentPerMouth}\n`);
        message = message.concat(`💰${room.roomPrice.sale || "-"}\n`);
        message = message.concat(`✍✍รายละเอียดเพิ่มเติม: ${room.figure.href || "-"}\n`);
        message = message.concat(`---------------------------------------\n`);
        message = message.concat(`🔺🔺เช่า-ซื้อคอนโดห้องอื่นๆได้ที่: https://bbc.condothai.co.th 🔺🔺\n`);
        message = message.concat(`📌📌สนใจติดต่อ(Contact)\n`);
        message = message.concat(`📞Tel: 085-3535222)\n`);
        message = message.concat(`📲Line: @naanfon\n`);
        message = message.concat(`📧Email: naamfonn@gmail.com\n`);
        message = message.concat(`💻facebook: https://fb.com/NaamFonn\n`);
        message = message.concat(`---------------------------------------\n`);
        return message;
    }

    async getCondoOnlyRooms(filename) {
        let condoLists  = await this.getCondoByLocationFilename(filename);
        let condoRoomLists = [];

        condoLists.forEach((condo) => {
            condo.rooms.forEach((room) => {
                condoRoomLists.push(room);
            })
        })

        return condoRoomLists;
    }
}

module.exports = {
    CondoThaiBot
}