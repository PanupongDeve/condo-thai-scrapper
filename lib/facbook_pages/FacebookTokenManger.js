const axios = require('axios').default;
const fs = require('fs');
const path = require('path');
const { rootDIR } = require('../../rootDIR');

class FacebookTokenManger {
    
    constructor({
        storage,
        userId
    }) {
        this.storage = storage;
        this.graphFacebookURL = "https://graph.facebook.com";
        this.userId = userId;
    }


    async saveLongliveToken({
        client_id,
        client_secret,
        fb_exchange_token
    }) {
        const queryParams = {
            grant_type: "fb_exchange_token",
            client_id,
            client_secret,
            fb_exchange_token
        }

        const response = await axios.get(`${this.graphFacebookURL}/oauth/access_token`, {
            params: queryParams
        });

        console.log(response.data);

        if (!fs.existsSync(path.join(rootDIR, this.storage))){
            fs.mkdirSync(path.join(rootDIR, this.storage));
        }

        if (response.data.access_token) {
            const data = {
                token: response.data.access_token
            }

            let dataStringify = JSON.stringify(data);
            fs.writeFileSync(path.join(rootDIR, this.storage, 'longlive.json'), dataStringify);
        } 
   
    }

    async getLongliveToken() {
        let jsonData = await require(`../../${this.storage}/longlive.json`);
        return jsonData;
    }

    async getPagesList() {
        const { token } =  await this.getLongliveToken();

        const queryParams = {
            access_token: token
        }

        const response = await axios.get(`${this.graphFacebookURL}/${this.userId}/accounts`, {
            params: queryParams
        });

        let pageLists = [];
        pageLists = response.data.data;

        return pageLists
    }

    async getPageTokenByPageID(pageId) {
        const pageLists = await this.getPagesList();
        
        const pageByPageId = pageLists.find((page) => page.id === pageId);
        if (pageByPageId) {
            return {
                pageToken: pageByPageId.access_token,
                pageId: pageByPageId.id,
                pageName: pageByPageId.name
            }
        }

        return null;
    }
}

module.exports = {
    FacebookTokenManger
}