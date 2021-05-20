const express = require(`express`);
const path = require(`path`);
const bodyParser = require(`body-parser`);
const responseTime = require(`response-time`);
const swagger = require(`swagger-node-express`);



const corsFilter = require(`../filters/cors.filter`);
const config = require(`./config`).props();
const swaggerUi = require(`swagger-ui-express`);
const swaggerDocument = require(`../swagger.json`);

const app = express();
const router = express.Router();


app.use(responseTime());

app.use(bodyParser.json({
    limit: `15mb`
}));
app.use(bodyParser.urlencoded({
    limit: `15mb`,
    "extended": false
}));

corsFilter(router);
app.use(`/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(`/lowes`, router);

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
    errorHandler.saveErrorLog(``, error, req.body, req.url);
    const response = new Response();
    response.data = null;
    response.error = error.message;
    response.status.statusCode = 500;
    response.status.message = `Something broke`;
    console.error("Something broke!", error);
    res.status(500).send(response);
});

var ApiConfig = {
    app: app
}

console.log(`landing to API config routes`);
const urlRoute = require(`../app/router/url.routes`)

urlRoute.init(router);

module.exports = ApiConfig;