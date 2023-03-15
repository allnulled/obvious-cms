module.exports = function (group_names = [], as_json = true) {
    try {
        this.api.utilities.trace("src/framework/api/server/middleware/authenticate.js");
        return async (request, response, next) => {
            try {
                this.api.utilities.trace("src/framework/api/server/middleware/authenticate.js");
                await this.api.server.request.authenticate(request);
                return next();
            } catch (error) {
                if (as_json) {
                    error.show_as_json = true;
                }
                return next(error);
            }
        }
    } catch (error) {
        this.api.utilities.error.handle("src/framework/api/server/middleware/authenticate.js", error);
    }
};