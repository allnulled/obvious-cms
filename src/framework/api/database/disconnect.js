module.exports = function () {
    try {
        this.api.utilities.trace("src/framework/api/database/disconnect.js");
        return this.api.database.connection.end();
    } catch (error) {
        this.api.utilities.error.handle("src/framework/api/database/disconnect.js", error);
    }
};