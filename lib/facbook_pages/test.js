const { facebookPages } = require('./facebook_pages');



const dasboard = async () => {
    await facebookPages.postPages();
}


dasboard()