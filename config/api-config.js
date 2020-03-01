const express = require('express');

const corsFilter = require('../filters/cors.filter');
const config = require('./config').props();

const app = express();
const router = express.Router();

corsFilter(router);
app.use('/demo', router);

//log errors
app.use(function (err, req, res, next) {
    let body;
    if (req.user) {
        if (Object.keys(req.body).length > 0)
            body = req.body;
        else if (Object.keys(req.params).length > 0)
            body = req.params;
        else if (Object.keys(req.query).length > 0)
            body = req.query;
        errorHandler.saveErrorLog(req.user.userId, err, body, req.url);
    } else
        next(err)
});
//error handler if something breaks
app.use(function (error, req, res, next) {
    console.error(error.stack);
    errorHandler.saveErrorLog('', error, req.body, req.url);
    const response = new Response();
    response.data = null;
    response.error = error.message;
    response.status.statusCode = 500;
    response.status.message = "Something broke!";
    console.log("Something broke!", error);
    res.status(500).send(response);
});



console.log('landing to API config routes');
//const swaggerRoute = require('../app/routes/swagger.routes');
const firstRoute = require('../app/router/basic.routes');

var ApiConfig = {
    app: app
}

//swaggerRoute.init(router);
firstRoute.init(router);

module.exports = ApiConfig;