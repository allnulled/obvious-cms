module.exports = function (file_path, file_configurations = {}) {
    try {
        this.api.utilities.trace("src/framework/api/server/controller/static/file.js");
        return (request, response, next) => {
            try {
                return response.sendFile(file_path, file_configurations);
            } catch (error) {
                return next(error);
            }
        };
    } catch (error) {
        this.api.utilities.error.handle("src/framework/api/server/controller/static/file.js", error);
    }
};