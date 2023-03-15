module.exports = async function () {
    try {
        const api_loader = require(`${__dirname}/api/utilities/api/load.js`);
        // factory
        // promiser
        // promise
        // class
        // static
        const scope = {};
        await api_loader(`${__dirname}/api`, scope, "api");
        return scope;
    } catch (error) {
        console.log("Error on «src/framework/index.js»", error);
    }
};