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
        const queryParams = {
            message,
            access_token: pageToken
        }

        const response = await axios.post(`${this.graphFacebookURL}/${pageId}/feed`,null, {
            params: queryParams
        });

        console.log(response.data);
    }
}

module.exports = {
    FacebookAutoPost
}