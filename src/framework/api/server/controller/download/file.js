module.exports = function (file) {
    try {
        this.api.utilities.trace("src/framework/api/server/controller/download/file.js");
        return (request, response, next) => {
            try {
                return response.download(file);
            } catch (error) {
                return next(error);
            }
        };
    } catch (error) {
        this.api.utilities.error.handle("src/framework/api/server/controller/download/file.js", error);
    }
};