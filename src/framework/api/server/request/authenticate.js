module.exports = async function (request, is_required = true) {
    try {
        this.api.utilities.trace("src/framework/api/server/request/authenticate.js");
        const authorization_token = this.api.server.request.headers.authorization.get(request);
        const authentication_data = await this.api.auth.authenticate.token(authorization_token, is_required);
        request.fw_data.authentication_token = authorization_token;
        request.fw_data.authentication_data = authentication_data;
        return authentication_data;
    } catch (error) {
        this.api.utilities.error.handle("src/framework/api/server/request/authenticate.js", error, true);
    }
};