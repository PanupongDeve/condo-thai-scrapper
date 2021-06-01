const { FacebookTokenManger } = require('../lib/facbook_pages/FacebookTokenManger');

const facebookTokenManger = new FacebookTokenManger({
    storage: "tokenStorage",
    userId: "4087883914601744"
});

const playgroud = async () => {
    await facebookTokenManger.saveLongliveToken({
        client_id: "514600879709130",
        client_secret: "6df786424aee488b8501fd8ff7fb3c48",
        fb_exchange_token: "EAAHUBtqi28oBANBw47W8RHt23TTRpglSiLRQpAOD7mkgOqe5cPmbw7ZAqkUxSsFOCrQdkRKmmApC5IczIgIIrvuoJTtHxMRQ90zQHFDiZCFewPLYVLwII6G0kHwJYCTEhZCMu9Q2q6rOZCIt7B71BLFjUflI5cAKgm5a9NdZA0tZBcQQZCzDAtlmKAcJgbvzFPW2nDq976esFTdz3WRsFAFsUCc7WGX5knpUIywG08zhITsAGbcRse0"
    });
    const data = await facebookTokenManger.getLongliveToken();
    console.log('-----data----', data);
}

playgroud()