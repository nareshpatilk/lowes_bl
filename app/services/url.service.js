const shortid = require("shortid");
const validUrl = require("valid-url");
const config = require(`../../config/config`).props();

const urlDao = require(`../dao/url.dao`);
const urlMapper = require(`../mapper/url.mapper`)


/**
 *  returns top url
 * @returns 
 */
const findAll =  async () => {

    try {
            let res = await urlDao.findAll();
            console.log(`Succesfully fetched all url {{in service}} ${res}`  );
            return res;
        } catch (error) {
            console.error(`Error in fetching url all data  {{in service}} ${error}`);
            throw error;
        }

}

/**
 * Save url
 * @param {*} reqBody 
 * @returns 
 */
const saveUrl =  async (reqBody) => {

    let res = null;
    try {
            console.log(`Saving  url details {{in service}} ${reqBody}`  );
            
            const baseUrl = config.baseURL;
            console.log(`Base url {{in service}} ${baseUrl}`  );
            /**
             * check validiity 
             */
            if(!validUrl.isUri(baseUrl)){
                return res;
            }

            const urlCode = shortid.generate();
            console.log(`urlCode {{in service}} ${urlCode}`  );
            let url = null;
            if(validUrl.isUri(baseUrl)){
                
                console.log(`longUrl {{in service}} ${reqBody.longUrl}`  );
                res = await urlDao.findUrl(reqBody.longUrl);
                console.log(`Url early found {{in service}} ${res}`  );

                if(res){
                    return res;
                }else{
                
                    const shortUrl = baseUrl + "/" + urlCode;
                    let saveMapper = urlMapper.saveUrlObj(reqBody, urlCode, shortUrl);
                    console.log(`saving to dao {{in service}} ${saveMapper}`  );
                    res = await urlDao.saveUrl(saveMapper);
                
                }
                
            }

            
            
            console.log(`Succesfully saving  url {{in service}} ${res}`  );
            return res;
        } catch (error) {
            console.error(`Error in saving url data  {{in service}} ${error}`);
            throw error;
        }

}



/**
 * find by urlCode
 * @returns 
 */
 const findUrlCode =  async (urlCode) => {

    try {
            let res = await urlDao.findUrlCode(urlCode);
            console.log(`Succesfully fetched  url code{{in service}} ${res}`  );
            return res;
        } catch (error) {
            console.error(`Error in fetching url code  {{in service}} ${error}`);
            throw error;
        }

}

/**
 * update click count
 * @returns 
 */
 const updateClickCode =  async (count, urlCode) => {

    try {
            count++;

            console.log(`new  click count{{in service}} ${count}`  );
            console.log(`urlCode {{in service}} ${urlCode}`  );
             await urlDao.updateClickCode(count, urlCode);
             let res = await urlDao.findUrlCode(urlCode);
            console.log(`Succesfully updated click count{{in service}} ${res}`  );
            return res;
        } catch (error) {
            console.error(`Error in updating click count  {{in service}} ${error}`);
            throw error;
        }

}

/**
 * gives result by pagination
 * @param {*} page 1,2,3
 * @param {*} resultsPerPage 5
 * @returns 
 */
 const paginationService =  async ( page, resultsPerPage) => {

    try {
            let res = await urlDao.findByPagination(page, resultsPerPage);
            let resLength = await urlDao.findAll();
            let data = urlMapper.paginationObj(res, resLength.length);
            console.log(`Succesfully fetched all url {{in service}} ${data}`  );
            return data;
        } catch (error) {
            console.error(`Error in fetching url all data  {{in service}} ${error}`);
            throw error;
        }

}

module.exports = {
    findAll: findAll,
    saveUrl:saveUrl,
    findUrlCode:findUrlCode,
    updateClickCode:updateClickCode,
    paginationService:paginationService
}





