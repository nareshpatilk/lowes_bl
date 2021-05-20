const Response = require(`../response/response.js`);
const urlService = require(`../services/url.service`);

let init = (router) => {

    router.route(`/findAll`).get(findAll);
    router.route(`/url/save`).post(saveUrl);
    router.route(`/:shortUrl`).get(findLongUrl);
    router.route(`/pagination/:page/:pageSize`).get(pagination);
}

/**
 * list all the url
 * @param {*} req 
 * @param {*} res 
 */
let findAll = async (req, res) => {
    const response = new Response();
    try {
        const data = await urlService.findAll();
        if (data) {
            response.data = data
            response.error = null;
            response.status.statusCode = 201;
            response.status.message = `Successfully fetched all url details`;
            console.log(`Successfully fetched all url details {{In controller}}`);
            res.status(201).json(response);
        } else {
            response.data = null;
            response.status.statusCode = 401;
            response.status.message = `No url found`;
            console.log(`No url found {{In controller}}`);
            res.status(401).json(response);
        }
    } catch (error) {
        response.data = null;
        response.error = error.message;
        response.status.statusCode = 500;
        response.status.message = `Somthing Broke!, please try after sometime`;
        console.error(`Error fetching First url details {{In controller}}${error}`);
        //next(error);
        res.status(500).json(response);
    }
}

/**
 * Save longurl to short url
 * @param {} req 
 * @param {*} res 
 */
let saveUrl = async (req, res) => {
    const response = new Response();
    const reqBody = req.body;
    try {
        const data = await urlService.saveUrl(reqBody);
        if (data) {
            response.data = data
            response.error = null;
            response.status.statusCode = 201;
            response.status.message = `Successfully saved url details`;
            console.log(`Successfully url details {{In controller}}`);
            res.status(201).json(response);
        } else {
            response.data = null;
            response.status.statusCode = 401;
            response.status.message = `Internal error. Please come back later.`;
            console.log(`Url not saved {{In controller}}`);
            res.status(401).json(response);
        }
    } catch (error) {
        response.data = null;
        response.error = error.message;
        response.status.statusCode = 500;
        response.status.message = `Somthing Broke!, please try after sometime`;
        console.error(`Error fetching First url details {{In controller}}${error}`);
        //next(error);
        res.status(500).json(response);
    }
}

/**
 * update click count and find url
 * @param {*} req 
 * @param {*} res 
 */
let findLongUrl = async (req, res) => {
    const response = new Response();
    const urlCode = req.params.shortUrl;
    
    try {
        console.log(` req.params {{In controller}} ${req.params}`);
        console.log(` shortlUrl {{In controller}} ${urlCode}`);
        let url = await urlService.findUrlCode(urlCode);
        if(url == null){

            response.data = null;
            response.status.statusCode = 404;
            response.status.message = `The short url doesn't exists`;
            console.log(`The short url doesn't exists {{In controller}}`);
            res.status(404).json(response);
        }else{
            const data = await urlService.updateClickCode(url.clickCount, urlCode);
            if (data) {
                response.data = data
                response.error = null;
                response.status.statusCode = 201;
                response.status.message = `Successfully updated and sent longurl details`;
                console.log(`Successfully url details {{In controller}}`);
                res.status(201).json(response);
            } else {
                response.data = null;
                response.status.statusCode = 401;
                response.status.message = `Internal error. Please come back later.`;
                console.log(`Url not saved {{In controller}}`);
                res.status(401).json(response);
            }
        }
       
    } catch (error) {
        response.data = null;
        response.error = error.message;
        response.status.statusCode = 500;
        response.status.message = `Somthing Broke!, please try after sometime`;
        console.error(`Error fetching First url details {{In controller}}${error}`);
        //next(error);
        res.status(500).json(response);
    }
}


/**
 *  do a pagination api
 * @param {*} req 
 * @param {*} res 
 */
let pagination = async (req, res) => {
    const response = new Response();
    const resultsPerPage = req.params.pageSize >= 1 ? req.params.pageSize : 5;
    let page = req.params.page >= 1 ? req.params.page : 1;
    try {
        const data = await urlService.paginationService(page,resultsPerPage );
        if (data) {
            response.data = data
            response.error = null;
            response.status.statusCode = 201;
            response.status.message = `Successfully fetched all url pagination`;
            console.log(`Successfully fetched all url pagination {{In controller}}`);
            res.status(201).json(response);
        } else {
            response.data = null;
            response.status.statusCode = 401;
            response.status.message = `No url found`;
            console.log(`No url found {{In controller}}`);
            res.status(401).json(response);
        }
    } catch (error) {
        response.data = null;
        response.error = error.message;
        response.status.statusCode = 500;
        response.status.message = `Somthing Broke!, please try after sometime`;
        console.error(`Error fetching First url details {{In controller}}${error}`);
        //next(error);
        res.status(500).json(response);
    }
}

module.exports.init = init;