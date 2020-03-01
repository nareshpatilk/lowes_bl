const Response = require('../response/response.js');
const basicService = require('../services/basic.service');

let init = (router) => {

    router.route('/1').get(callFistApi);
};

let callFistApi = async (req, res) => {
    const response = new Response();
    try {

        if (true) {
            response.data = await basicService.basicServiceFun();
            response.error = null;
            response.status.statusCode = 201;
            response.status.message = 'BWAPI0003';
            console.log("Successfully fetched user First details {{In controller}}");
            res.status(201).json(response);
        } else {
            response.data = null;
            response.status.statusCode = 401;
            console.log("Error fetching user First details {{In controller}}", error);
            res.status(401).json(response);
        }
    } catch (error) {
        response.data = null;
        response.error = error.message;
        response.status.statusCode = 500;
        response.status.message = "system_error";
        console.log("Error fetching user First details {{In controller}}", error);
        next(error);
        res.status(500).json(response);
    }
}

module.exports.init = init;