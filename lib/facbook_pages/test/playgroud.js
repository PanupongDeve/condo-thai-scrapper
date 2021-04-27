

const { FacebookTokenManger } = require('../FacebookTokenManger');
const { FacebookAutoPost } = require('../FacebookAutoPost');

const facebookTokenManger = new FacebookTokenManger({
    storage: "tokenStorage",
    userId: "4087883914601744"
});

const facebookAutoPost = new FacebookAutoPost();

const playgroud = async () => {
    await facebookTokenManger.saveLongliveToken({
        client_id: "514600879709130",
        client_secret: "6df786424aee488b8501fd8ff7fb3c48",
        fb_exchange_token: "EAAHUBtqi28oBAD5UKi0ntcgate1J0mHI3eGLQSHhUOtCeO9QnO0QcpTVOwc3ejD33eA5LfjhJlaTascZA44a2AodCTXo8L9zJdzf6Fy4LrAgEFUstohE4C6pAsl7sSKiWAKht0rTqEB1jRK4K7oZCjHNvAyPjPTaoV4nDWeFniOTRaiiIzQnMnSZBVmkh76GH9pXJxmw9a6otblhAKCZA0KtqhZAxEbZCBP6MO9vrSZBwZDZD"
    });
    const data = await facebookTokenManger.getLongliveToken();
    console.log('-----data----', data);

    const page_data = await facebookTokenManger.getPageTokenByPageID("100450045533878");
    console.log('---- page data----', page_data);

    await facebookAutoPost.autoPostFeed({
        message: "Auto Posted By Auto Post Tester",
        pageId: page_data.pageId,
        pageToken: page_data.pageToken
    })
    
}

playgroud()