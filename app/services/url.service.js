const logger = require(`../../logger`);
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
            logger.info(`Succesfully fetched all url {{in service}} ${res}`  );
            return res;
        } catch (error) {
            logger.error(`Error in fetching url all data  {{in service}} ${error}`);
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
            logger.info(`Saving  url details {{in service}} ${reqBody}`  );
            
            const baseUrl = config.baseURL;
            logger.info(`Base url {{in service}} ${baseUrl}`  );
            /**
             * check validiity 
             */
            if(!validUrl.isUri(baseUrl)){
                return res;
            }

            const urlCode = shortid.generate();
            logger.info(`urlCode {{in service}} ${urlCode}`  );
            let url = null;
            if(validUrl.isUri(baseUrl)){
                
                logger.info(`longUrl {{in service}} ${reqBody.longUrl}`  );
                res = await urlDao.findUrl(reqBody.longUrl);
                logger.info(`Url early found {{in service}} ${res}`  );

                if(res){
                    return res;
                }else{
                
                    const shortUrl = baseUrl + "/" + urlCode;
                    let saveMapper = urlMapper.saveUrlObj(reqBody, urlCode, shortUrl);
                    logger.info(`saving to dao {{in service}} ${saveMapper}`  );
                    res = await urlDao.saveUrl(saveMapper);
                
                }
                
            }

            
            
            logger.info(`Succesfully saving  url {{in service}} ${res}`  );
            return res;
        } catch (error) {
            logger.error(`Error in saving url data  {{in service}} ${error}`);
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
            logger.info(`Succesfully fetched  url code{{in service}} ${res}`  );
            return res;
        } catch (error) {
            logger.error(`Error in fetching url code  {{in service}} ${error}`);
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

            logger.info(`new  click count{{in service}} ${count}`  );
            logger.info(`urlCode {{in service}} ${urlCode}`  );
             await urlDao.updateClickCode(count, urlCode);
             let res = await urlDao.findUrlCode(urlCode);
            logger.info(`Succesfully updated click count{{in service}} ${res}`  );
            return res;
        } catch (error) {
            logger.error(`Error in updating click count  {{in service}} ${error}`);
            throw error;
        }

}

module.exports = {
    findAll: findAll,
    saveUrl:saveUrl,
    findUrlCode:findUrlCode,
    updateClickCode:updateClickCode
}





