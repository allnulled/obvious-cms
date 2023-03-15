module.exports = function (text) {
    try {
        this.api.utilities.trace("src/framework/api/server/controller/message.js");
        return (request, response, next) => {
            try {
                return response.json({
                    message: text
                });
            } catch(error) {
                return next(error);
            }
        };
    } catch (error) {
        this.api.utilities.error.handle("src/framework/api/server/controller/message.js", error);
    }
};