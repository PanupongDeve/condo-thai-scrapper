const axios = require('axios').default;

class FacebookAutoPost {
    constructor() {
        this.graphFacebookURL = "https://graph.facebook.com";
    }

    async autoPostFeed({
        pageId,
        pageToken,
        message
    }) {
       try {
        const queryParams = {
            message,
            access_token: pageToken
        }

        const response = await axios.post(`${this.graphFacebookURL}/${pageId}/feed`,null, {
            params: queryParams
        });

        console.log(response.data);
       } catch (e) {
        console.log(e);
       }
    }

    async autoPostFeedWithPicture({
        pageId,
        pageToken,
        message,
        linkPost
    }) {
       try {
        const queryParams = {
            message,
            access_token: pageToken,
            link: linkPost
        }

        const response = await axios.post(`${this.graphFacebookURL}/${pageId}/feed`,null, {
            params: queryParams
        });

        console.log(response.data);
       } catch (e) {
        console.log(e);
       }
    }
}

module.exports = {
    FacebookAutoPost
}