module.exports = function (user_names = [], as_json = true) {
    try {
        this.api.utilities.trace("src/framework/api/server/middleware/authorize/except/users.js");
        return async (request, response, next) => {
            try {
                this.api.utilities.trace("src/framework/api/server/middleware/authorize/except/users.js");
                await this.api.server.request.authenticate(request);
                await this.api.auth.authorize.except.users(user_names, request.fw_data.authentication_data);
                return next();
            } catch (error) {
                if (as_json) {
                    error.show_as_json = true;
                }
                return next(error);
            }
        }
    } catch (error) {
        this.api.utilities.error.handle("src/framework/api/server/middleware/authorize/except/users.js", error);
    }
};