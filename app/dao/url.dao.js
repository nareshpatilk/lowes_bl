const logger = require(`../../logger`);
const urlSchema = require(`../schemas/url.schema`);


/**
 * Gets all url
 * @returns 
 */
let findAll = async () => {
    try {
        let data = await (urlSchema.find() );
        
        logger.info(`Successfully fetched url all details {{in dao}}${data}`);
        return data;
    } catch (error) {
        logger.error(`Error in fetching url all details {{in dao}}${error}`);
        throw error;
    }
}

/**
 * Save url to db
 * @param {} saveObj 
 * @returns 
 */
let saveUrl = async (saveObj) => {
    try {
        let data = await urlSchema.create(saveObj);
        
        logger.info(`Successfully saved url details {{in dao}}${data}`);
        return data;
    } catch (error) {
        logger.error(`Error in saving url  details {{in dao}}${error}`);
        throw error;
    }
}

/**
 * return exisitn url
 * @param {} saveObj 
 * @returns 
 */
 let findUrl = async (url) => {
    try {
        let data = await urlSchema.findOne({
            longUrl: url
        });
        
        logger.info(`Successfully found url  {{in dao}}${data}`);
        return data;
    } catch (error) {
        logger.error(`Error in finding url   {{in dao}}${error}`);
        throw error;
    }
}

/**
 * return exisitn urlcode
 * @param {} saveObj 
 * @returns 
 */
 let findUrlCode = async (urlCode) => {
    try {
        let data = await urlSchema.findOne({
            urlCode: urlCode
        });
        
        logger.info(`Successfully found url code  {{in dao}}${data}`);
        return data;
    } catch (error) {
        logger.error(`Error in finding url code  {{in dao}}${error}`);
        throw error;
    }
}

/**
 * uppdate click count
 * @param {*} count 
 * @param {*} urlCode 
 * @returns 
 */
 let updateClickCode = async (count, urlCode) => {
    try {
        let data = await urlSchema.updateOne(
            {
                urlCode: urlCode
            },
            {
                clickCount: count
            });
        
        logger.info(`Successfully updated  click count  {{in dao}}${data}`);
        return data;
    } catch (error) {
        logger.error(`Error in updating click count  {{in dao}}${error}`);
        throw error;
    }
}


module.exports = {
    findAll: findAll,
    saveUrl:saveUrl,
    findUrl:findUrl,
    findUrlCode:findUrlCode,
    updateClickCode:updateClickCode
    
}