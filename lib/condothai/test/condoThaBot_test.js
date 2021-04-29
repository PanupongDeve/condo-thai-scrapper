

const { CondoThaiBot } = require('../CondoThaiBot');

const condoThaiBot = new CondoThaiBot({
    hostname: "https://bbc.condothai.co.th"
});

const playgroud = async () => {
    // await condoThaiBot.syncData("Phuket", "Phuket", "7.89044:98.3898")
    await condoThaiBot.syncAll();
    // console.log(await condoThaiBot.generateMessageFacebookAutoPost("Phuket"));
    // console.log(await condoThaiBot.getCondoOnlyRooms("Phuket"));
}

playgroud()