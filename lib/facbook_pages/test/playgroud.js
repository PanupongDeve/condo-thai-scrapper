

const { FacebookTokenManger } = require('../FacebookTokenManger');
const { FacebookAutoPost } = require('../FacebookAutoPost');
const { CondoThaiBot } = require('../../condothai');
const _ = require('lodash');

const facebookTokenManger = new FacebookTokenManger({
    storage: "tokenStorage",
    userId: "4087883914601744"
});

const condoThaiBot = new CondoThaiBot({
    hostname: "https://bbc.condothai.co.th"
});


const facebookAutoPost = new FacebookAutoPost();

const playgroud2 = async () => {
    console.log(await facebookTokenManger.getPagesList());
}

const playgroud = async () => {
    // await facebookTokenManger.saveLongliveToken({
    //     client_id: "514600879709130",
    //     client_secret: "6df786424aee488b8501fd8ff7fb3c48",
    //     fb_exchange_token: "EAAHUBtqi28oBAD5UKi0ntcgate1J0mHI3eGLQSHhUOtCeO9QnO0QcpTVOwc3ejD33eA5LfjhJlaTascZA44a2AodCTXo8L9zJdzf6Fy4LrAgEFUstohE4C6pAsl7sSKiWAKht0rTqEB1jRK4K7oZCjHNvAyPjPTaoV4nDWeFniOTRaiiIzQnMnSZBVmkh76GH9pXJxmw9a6otblhAKCZA0KtqhZAxEbZCBP6MO9vrSZBwZDZD"
    // });
    // const data = await facebookTokenManger.getLongliveToken();
    // console.log('-----data----', data);

    
    // console.log('---- page data----', page_data);

    // console.log(await facebookTokenManger.getPagesList());



    // const page_data = await facebookTokenManger.getPageTokenByPageID("103963291842047");
    // let roomLists = await condoThaiBot.getCondoOnlyRooms("Phuket");

    const page_data = await facebookTokenManger.getPageTokenByPageID("109811484582330");
    let roomLists = await condoThaiBot.getCondoOnlyRooms("Chiang_Mai");

    roomLists = _.shuffle(roomLists)
    // roomLists = roomLists.slice(0,6);
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

    // roomLists.forEach(async (room) => {
        
    //     let messagePost = await condoThaiBot.generateMessageFacebookOnlyRoom(room);
    //     await facebookAutoPost.autoPostFeedWithPicture({
    //         message: messagePost,
    //         pageId: page_data.pageId,
    //         pageToken: page_data.pageToken,
    //         linkPost: room.figure.href
    //     })
    // })
    
    
}

playgroud()