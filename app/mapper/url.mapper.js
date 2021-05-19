
let saveUrlObj = (reqBody, urlCode, shortUrl) => {
    
    let saveObj = {};
    saveObj.longUrl = reqBody.longUrl;
    saveObj.shortUrl= shortUrl;
    saveObj.urlCode= urlCode;
    saveObj.clickCount= 0
    

    return saveObj;
}

module.exports = {
    saveUrlObj: saveUrlObj
}