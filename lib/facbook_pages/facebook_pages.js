const axios = require('axios').default;


class FacbookAccessToken {
    constructor(data) {
        this.access_token = data.access_token;
        this.token_type = data.token_type;
        
    }
}


class FacebookLongliveToken {
    constructor(data) {
        console.log(data);
        this.access_token = data.access_token;
        this.token_type = data.token_type;
        this.expires_in = data.expires_in;
    }
}
class FacebookPages {
    constructor() {
        this.graphFacebookURL = "https://graph.facebook.com";
        this.grapApiVersion = "v10.0";
        this.user_id = "4087883914601744";
    }


    async getLongliveUseraccessToken() {
        try {
            const queryParams = {
                grant_type: "fb_exchange_token",
                client_id: "514600879709130",
                client_secret: "6df786424aee488b8501fd8ff7fb3c48",
                fb_exchange_token: "EAAHUBtqi28oBABZCmWVdLPpe4rqx4eZA4HYBEcHRTnBZB7ed4Nwsb8eC1LQBrZBTsLqrh4hVrISAaUOaNRxYWL9xVZAsYk5TCcgyCmZAN9j3YMaijZAZAUHyAaXuzhUCGB078TeZBoYACZC4OCzKNBmx6wikcmEpeDVJkZAIQ8Uhwv2Od1zuWwQRQqiDXvuqyoYT7JGaMEVJ7W0zAZDZD"
    
            }
    
            const response = await axios.get(`${this.graphFacebookURL}/oauth/access_token`, {
                params: queryParams
            });

            const { data } = response;

            const facebookAccessToken = new FacebookLongliveToken(data);
    
            return facebookAccessToken;
        } catch (e) {
            console.log(e);
        }
    }

    async generateFacebookToken() {
        try {
            const queryParams = {
                grant_type: "client_credentials",
                client_id: "514600879709130",
                client_secret: "6df786424aee488b8501fd8ff7fb3c48",
    
            }
    
            const response = await axios.get(`${this.graphFacebookURL}/${this.grapApiVersion}/oauth/access_token`, {
                params: queryParams
            });

            const { data } = response;

            const facebookAccessToken = new FacbookAccessToken(data);
    
            return facebookAccessToken;
        } catch (e) {
            console.log(e.message);
        }
    }

    async getUserAaccount() {
        // const facebookAccessToken = await this.generateFacebookToken();


        const queryParams = {
            access_token: "EAAHUBtqi28oBABHTwXgtsAhEusi4e1ou7dLu6waFgug2oosd4Uzak0dEnwignYICSqDTqvyLYaY3g4cfOX4wRINujclsg75FyKT9eyXB8EUpMFuOcUGgxnJSmURSc8yFrL5OpwZATOoufCHpZAr3JQ8HZBp1xdvgCkz2hhZATwZDZD"
        }

        const response = await axios.get(`${this.graphFacebookURL}/${this.user_id}/accounts`, {
            params: queryParams
        });

        console.log(response.data);
    }

    async postPages() {
        try {
            const queryParams = {
                message: `[13904] เช่าคอนโด 1 ปี ศุภาลัย ปาร์ค @ ดาวน์ทาวน์ ภูเก็ต [SUPALAI PARK @ DOWNTOWN PHUKET] 29.5 ตรม. ชั้น 6"\nเช่า 10,000 ฿ \nnรายละเอียด:\n`,
                link: `https://www.condothai.co.th/room/13904/%E0%B8%A8%E0%B8%B8%E0%B8%A0%E0%B8%B2%E0%B8%A5%E0%B8%B1%E0%B8%A2%20%E0%B8%9B%E0%B8%B2%E0%B8%A3%E0%B9%8C%E0%B8%84%20%40%20%E0%B8%94%E0%B8%B2%E0%B8%A7%E0%B8%99%E0%B9%8C%E0%B8%97%E0%B8%B2%E0%B8%A7%E0%B8%99%E0%B9%8C%20%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95%20%5BSUPALAI%20PARK%20%40%20DOWNTOWN%20PHUKET%5D/12/?distance=10`,
                access_token: "EAAHUBtqi28oBACiWJGKo0JlPzqOOYUyGtamo4mwaztMKCZCWdZAzjJKkZANZC5Or4SfSLpgIpokZAGDOjecRaX7qmBBXrn8uyTsMWTDoggaMTYkxXKLvlyKEroT9ENHoIiLlx829eHtEGACdy1CsCCyOJu07ZBZCl40lO6DbS7lRQZDZD"
            }
    
            const response = await axios.post(`${this.graphFacebookURL}/103963291842047/feed`,null, {
                params: queryParams
            });
    
            console.log(response.data);
        } catch (e) {
            console.log(e)
        }
    }
}




const facebookPages = new FacebookPages();

module.exports = {
    facebookPages
}