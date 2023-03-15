module.exports = function (file_path, file_configurations = {}) {
    try {
        this.api.utilities.trace("src/framework/api/server/controller/error/static.js");
        return (error, request, response, next) => {
            try {
                this.api.utilities.error.handle("src/framework/api/server/controller/error/static.js", error);
                return response.sendFile(file_path, file_configurations);
            } catch (error) {
                return next(error);
            }
        };
    } catch (error) {
        this.api.utilities.error.handle("src/framework/api/server/controller/error/static.js", error);
    }
};