module.exports = require(`${__dirname}/load.js`)().then((apis) => {
    return apis.framework.api.server.start();
}).catch(error => {
    console.log("Error on «src/start.js»", error);
});