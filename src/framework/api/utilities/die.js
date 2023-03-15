module.exports = async function (...args) {
    try {
        this.api.utilities.trace("src/framework/api/utilities/shutdown.js");
        console.log(...args);
        process.exit(0);
    } catch (error) {
        this.api.utilities.error.handle("src/framework/api/utilities/shutdown.js", error);
    }
};