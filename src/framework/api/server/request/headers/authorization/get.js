module.exports = function (request, is_required = true) {
    try {
        this.api.utilities.trace("src/framework/api/server/request/headers/authorization/get.js");
        let authorization_header = request.headers.authorization;
        if (typeof authorization_header !== "string") {
            authorization_header = request.query.authorization;
        }
        if (typeof authorization_header !== "string") {
            if(typeof request.body === "object") {
                authorization_header = request.body.authorization;
            }
        }
        if(is_required) {
            if (typeof authorization_header !== "string") {
                throw new Error("Request header «Authorization» must not be empty to «framework.api.server.request.headers.authorization.get»");
            }
        }
        return authorization_header;
    } catch (error) {
        this.api.utilities.error.handle("src/framework/api/server/request/headers/authorization/get.js", error, true);
    }
};