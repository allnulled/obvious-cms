module.exports = async function () {
    try {
        this.api.utilities.trace("src/framework/api/database/load.js");
        await this.api.database.connect();
    } catch (error) {
        this.api.utilities.error.handle("src/framework/api/database/load.js", error);
    }
};