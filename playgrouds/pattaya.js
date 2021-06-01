const { FacebookTokenManger } = require('../lib/facbook_pages/FacebookTokenManger');
const { FacebookAutoPost } = require('../lib/facbook_pages/FacebookAutoPost');
const { CondoThaiBot } = require('../lib/condothai/CondoThaiBot');
const _ = require('lodash');

const facebookTokenManger = new FacebookTokenManger({
    storage: "tokenStorage",
    userId: "4087883914601744"
});

const condoThaiBot = new CondoThaiBot({
    hostname: "https://bbc.condothai.co.th"
});


const facebookAutoPost = new FacebookAutoPost();

const playgroud = async () => {
    const page_data = await facebookTokenManger.getPageTokenByPageID("100450045533878");
    let roomLists = await condoThaiBot.getCondoOnlyRooms("Pattaya");

    roomLists = _.shuffle(roomLists)
    roomLists = roomLists.slice(0,21);
    let index = 0;

    let funcInterval = setInterval(async () => {
        if (index === roomLists.length) {
            clearInterval(funcInterval);
            return;
        }

        let room = roomLists[index]
        let messagePost = await condoThaiBot.generateMessageFacebookOnlyRoom(room);
        await facebookAutoPost.autoPostFeedWithPicture({
            message: messagePost,
            pageId: page_data.pageId,
            pageToken: page_data.pageToken,
            linkPost: room.figure.href
        })

        index++;
    }, 10000)
}

playgroud();
