const urlSchema = require(`../schemas/url.schema`);


/**
 * Gets all url
 * @returns 
 */
let findAll = async () => {
    try {
        let data = await (urlSchema.find() );
        
        console.log(`Successfully fetched url all details {{in dao}}${data}`);
        return data;
    } catch (error) {
        console.error(`Error in fetching url all details {{in dao}}${error}`);
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
        
        console.log(`Successfully saved url details {{in dao}}${data}`);
        return data;
    } catch (error) {
        console.error(`Error in saving url  details {{in dao}}${error}`);
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
        
        console.log(`Successfully found url  {{in dao}}${data}`);
        return data;
    } catch (error) {
        console.error(`Error in finding url   {{in dao}}${error}`);
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
        
        console.log(`Successfully found url code  {{in dao}}${data}`);
        return data;
    } catch (error) {
        console.error(`Error in finding url code  {{in dao}}${error}`);
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
        
        console.log(`Successfully updated  click count  {{in dao}}${data}`);
        return data;
    } catch (error) {
        console.error(`Error in updating click count  {{in dao}}${error}`);
        throw error;
    }
}

/**
 * pagination support
 * @returns 
 */
 let findByPagination = async ( page, resultsPerPage ) => {
    try {
        let newResultsPerPage = parseInt(resultsPerPage);
        let newPage = parseInt(page);

        console.log(`page {{in dao}}${page}`);
        console.log(`resultsPerPage {{in dao}}${resultsPerPage}`);

        console.log(`newResultsPerPage {{in dao}}${newResultsPerPage}`);
        console.log(`newPage {{in dao}}${newPage}`);

        let data = await urlSchema.find({})
        .sort({shortUrl:"asc"})
        .limit(newResultsPerPage)
        .skip(newPage) ;
        
        console.log(`Successfully fetched url findByPagination {{in dao}}${data}`);
        return data;
    } catch (error) {
        console.error(`Error in fetching url findByPagination {{in dao}}${error}`);
        throw error;
    }
}

module.exports = {
    findAll: findAll,
    saveUrl:saveUrl,
    findUrl:findUrl,
    findUrlCode:findUrlCode,
    updateClickCode:updateClickCode,
    findByPagination:findByPagination
    
}