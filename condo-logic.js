const cheerio = require('cheerio');
const axios = require('axios').default;
const { downloadImage } = require('./dowloadImage');
const path = require('path');


class CondoEntity {
    constructor() {
        this.projectTitle = "";
        // this.projectLink = "";
        this.rooms = [];
    }
}

class Room {
    title = "";
    figure = {};
    roomPrice = {};

}

class RoomFigture {
    href = "";
    fig_href = "";
    fig_storage_url = "";
}

class RoomPrice {
    rentPerMouth = "";
    sale=""
}

const storageImageURL = (url="", location, callback) => {
    console.log('url', url)
    let spli_tmps =  url.split("/");
    let fileName = spli_tmps[spli_tmps.length-1];
    fileName = fileName.split('?')[0].trim();
    console.log('fileName', fileName);
    pathStore = path.join('public', 'images', location, fileName);
    downloadImage(url, pathStore, callback)
    return pathStore;
}


const detectRoomFigureURL = (el="") => {
    let result = el.split("(")[1];
    result = result.split(")")[0];
    return result;
}

const getCondoURL = (location, coordinates, page = 1) => {
    return `https://bbc.condothai.co.th/search/map/${location}/12/${coordinates}?distance=10&page=${page}`
}

const getPages = async (location, coordinates) => {
    
    const response = await axios.get(getCondoURL(location, coordinates, 1));
    
    const $ = cheerio.load(response.data);

    const loaded = $('#scroll-to > footer:nth-child(3)');
    const pages = loaded.children().length;
    
    return pages;
}

const getCondoDetail = async (location, filename, coordinates, page) => {
    let condo_lists = [];
    const response = await axios.get(getCondoURL(location, coordinates, page));
    const $ = cheerio.load(response.data);

    const condoLists = $('#search_result > article.nearcondo');
    condoLists.each( async (i, condoEl) => {
        let condoEntity = new CondoEntity();
        condoEntity.projectTitle = $(condoEl).find('> header > h2 > a').text();
        // condoEntity.projectLink = $(condoEl).find('> header > h2 > a').attr('href');
        condoEntity.rooms = getRooms($, condoEl, []);
        condoEntity.rooms = mappingImageStorage(condoEntity.rooms, filename);
        // console.log('projects', condoEntity);
        condo_lists.push(condoEntity);
    })

    return condo_lists;
}

const getRooms = ($ = cheerio.load(condoEl), condoEl="", rooms=[]) => {
    $(condoEl).find('div.body').each((i, roomEl) => {
        const room = new Room();
        const roomFigure = new RoomFigture();
        const roomPrice = new RoomPrice();

        room.title = $(roomEl).find('div.body > h3 > a:nth-child(2)').text();
        roomFigure.href = $(roomEl).find('div.body > a.figure').attr('href');
        roomFigure.fig_href = $(roomEl).find('div.body > a.figure').attr('style');
        roomFigure.fig_href = detectRoomFigureURL(roomFigure.fig_href);
        roomPrice.rentPerMouth = $(roomEl).find('div.body > div.details > p:nth-child(2)').text();
        roomPrice.sale = $(roomEl).find('div.body > div.details > p:nth-child(3)').text();

        room.figure = roomFigure;
        room.roomPrice = roomPrice;
        // console.log('test', $(roomEl).text());

        rooms.push(room);
    })
    
        
    return rooms;
}

const mappingImageStorage = (rooms = [], filename) => {
    let roomsMapped = [];

    roomsMapped = rooms.map(room => {
        room.figure.fig_storage_url = storageImageURL(room.figure.fig_href, filename, () => {})
        return room;
    })

    return roomsMapped;
    
}

// findRoomTitle

const getCondoLists = async (location, filename, coordinates, pages) => {
    let result = [];
    console.log(pages);
    for(page = 1; page <= pages; page++) {
        const condoLists = await getCondoDetail(location, filename, coordinates, page);
        
        result = result.concat(condoLists);
    }

    return result;
}

const condoScraper = async (location, filename, coordinates) => {
    const pages = await getPages(location, coordinates);
    // console.log('pages', pages);
    const condoLists = await getCondoLists(location, filename, coordinates, pages);

    // console.log('condoLists',  JSON.stringify(condoLists, null, 4));

    return condoLists;
}


// condoScraper('Phuket', '7.89044:98.3898')

module.exports = {
    condoScraper
}

