module.exports = function (response, data, metadata = {}, code = 200) {
    try {
        this.api.utilities.trace("src/framework/api/server/response/dispatch/json/success.js");
        const base_factory = require(__dirname + "/base.js");
        const base = base_factory();
        const response_object = Object.assign({}, base, { data: data }, metadata);
        return response.status(code).json(response_object);
    } catch (error) {
        this.api.utilities.error.handle("src/framework/api/server/response/dispatch/json/success.js", error);
    }
};