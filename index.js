const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const logger = require('node-color-log');
const {
    preview
} = require("./lib");

// config, plugins
logger.setLevel("debug");
app.use(bodyParser.json());

// endpoints
app.post('/generate', (req, res) => {
    const error = (e) => {
        logger.error(e || "Sending default error response...");
        res.send({
            error: true
        })
    }

    let urlToParse = req.body.url;

    if (!urlToParse) {
        error();
    }

    if (!urlToParse.includes('https://')) {
        urlToParse = "https://" + urlToParse;
    }

    logger.debug("Parsing URL: " + urlToParse);

    preview(urlToParse).then(result => {
        logger.debug(`Parsed URL: ${urlToParse}, result title: ${result.title}`);
        res.send(result);
    }).catch(e => {
        logger.error(`Failed to parse URL: ${urlToParse}`);
        error();
    })
})

// server listen
app.listen(3000, () => {
    logger.info(`Listening at http://localhost:3000`)
})