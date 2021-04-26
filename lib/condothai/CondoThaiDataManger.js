const cheerio = require('cheerio');
const axios = require('axios').default;
const { ImageURLUtils } = require('./utils/ImageURLUtils');
const { Condo } = require('./entity/Condo');
const { CondoRoom } = require("./entity/CondoRoom");
const {  RoomFigture } = require("./entity/RoomFigture");
const {  RoomPrice } = require("./entity/RoomPrice");

class CondoThaiDataManger {
    constructor(arg) {
        this.dowloadImageFlag = arg.dowloadImageFlag;
        this.hostname = arg.hostname
        this.imageURLUtils = new ImageURLUtils();
    }

    async getCondoSearchList(location, filename, coordinates) {
        const pages = await this._getPages(location, coordinates);
        // console.log('pages', pages);
        const condoLists = await this._getCondoListsAllPages(location, filename, coordinates, pages);

        // console.log('condoLists',  JSON.stringify(condoLists, null, 4));

        return condoLists;
    }

    _getCondoURL(location, coordinates, page = 1) {
        return `${this.hostname}/search/map/${location}/12/${coordinates}?distance=10&page=${page}`
    }


    async _getPages(location, coordinates) {
        console.log(this._getCondoURL(location, coordinates, 1));
        const response = await axios.get(this._getCondoURL(location, coordinates, 1));
    
        const $ = cheerio.load(response.data);

        const loaded = $('#scroll-to > footer:nth-child(3)');
        const pages = loaded.children().length;
        
        return pages;
    }

    async _getCondoRooms($, condoEl, rooms) {


        $(condoEl).find('div.body').each((i, roomEl) => {
            const room = new CondoRoom();
            const roomFigure = new RoomFigture();
            const roomPrice = new RoomPrice();
    
            room.title = $(roomEl).find('div.body > h3 > a:nth-child(2)').text();
            roomFigure.href = $(roomEl).find('div.body > a.figure').attr('href');
            roomFigure.fig_href = $(roomEl).find('div.body > a.figure').attr('style');
            roomFigure.fig_href = this.imageURLUtils.detectRoomFigureURL(roomFigure.fig_href);
            roomPrice.rentPerMouth = $(roomEl).find('div.body > div.details > p:nth-child(2)').text();
            roomPrice.sale = $(roomEl).find('div.body > div.details > p:nth-child(3)').text();
    
            room.figure = roomFigure;
            room.roomPrice = roomPrice;
    
            rooms.push(room);
        }) 
        return rooms;
    }

    async _getCondoLists(location, filename, coordinates, page) {
        let condo_lists = [];
        const response = await axios.get(this._getCondoURL(location, coordinates, page));
        const $ = cheerio.load(response.data);

        const condoLists = $('#search_result > article.nearcondo');
        condoLists.each( async (i, condoEl) => {
            let condoEntity = new Condo();
            condoEntity.projectTitle = $(condoEl).find('> header > h2 > a').text();
            // condoEntity.projectLink = $(condoEl).find('> header > h2 > a').attr('href');
            condoEntity.rooms = await this._getCondoRooms($, condoEl, []);
            // condoEntity.rooms = mappingImageStorage(condoEntity.rooms, filename);
            // console.log('projects', condoEntity);
            condo_lists.push(condoEntity);
        })

        return condo_lists;
    }

    async _getCondoListsAllPages(location, filename, coordinates, pages) {
        let result = [];
        console.log(pages);
        for(let page = 1; page <= pages; page++) {
            const condoLists = await this._getCondoLists(location, filename, coordinates, page);
            result = result.concat(condoLists);
        }

        return result;
    }

}

module.exports = {
    CondoThaiDataManger  
}