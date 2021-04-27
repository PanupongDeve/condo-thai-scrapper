const { CondoThaiBot } = require('../lib/condothai');
const { FacebookAutoPost, FacebookTokenManger } = require('../lib/facbook_pages');


const condoThaiBot = new CondoThaiBot({
    hostname: "https://bbc.condothai.co.th"
});

const facebookTokenManger = new FacebookTokenManger({
    storage: "tokenStorage",
    userId: "4087883914601744"
});

const facebookAutoPost = new FacebookAutoPost();

module.exports = {
    condoThaiBot,
    facebookTokenManger,
    facebookAutoPost
}
