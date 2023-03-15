module.exports = function () {
    try {
        this.api.utilities.trace("src/framework/api/server/controller/auth/login.js");
        return async (request, response, next) => {
            try {
                const { user, password } = await this.api.server.request.parameters.any.get(request, ["user","password"], true, true)
                const authentication_data = await this.api.auth.authenticate.login(user, password);
                return this.api.server.response.dispatch.json.success(response, {
                    message: "Logged in successfully",
                    authentication: authentication_data
                });
            } catch (error) {
                error.show_as_json = true;
                return next(error);
            }
        };
    } catch (error) {
        this.api.utilities.error.handle("src/framework/api/server/controller/auth/login.js", error);
    }
};