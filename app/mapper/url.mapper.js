
let saveUrlObj = (reqBody, urlCode, shortUrl) => {
    
    let saveObj = {};
    saveObj.longUrl = reqBody.longUrl;
    saveObj.shortUrl= shortUrl;
    saveObj.urlCode= urlCode;
    saveObj.clickCount= 0
    

    return saveObj;
}

let paginationObj = (pagedResult, count) => {
    
    let obj = {};
    obj.urlList = pagedResult;
    obj.size= count;
    

    return obj;
}

module.exports = {
    paginationObj: paginationObj,
    saveUrlObj:saveUrlObj
}