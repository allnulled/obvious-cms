module.exports = function () {
    try {
        this.api.utilities.trace("src/framework/api/server/controller/auth/logout.js");
        return async (request, response, next) => {
            try {
                const session_token = await this.api.server.request.headers.authorization.get(request);
                await this.api.auth.authenticate.logout(session_token);
                return this.api.server.response.dispatch.json.success(response, {
                    message: "Logged out successfully"
                });
            } catch (error) {
                error.show_as_json = true;
                return next(error);
            }
        };
    } catch (error) {
        this.api.utilities.error.handle("src/framework/api/server/controller/auth/logout.js", error);
    }
};