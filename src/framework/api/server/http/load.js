module.exports = async function () {
    try {
        this.api.utilities.trace("src/framework/api/server/http/load.js");
        this.api.server.http.instance = this.api.dependencies.http.createServer(this.api.server.app.instance);
    } catch (error) {
        this.api.utilities.error.handle("src/framework/api/server/http/load.js", error);
    }
};