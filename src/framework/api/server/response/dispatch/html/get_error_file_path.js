module.exports = function () {
    try {
        this.api.utilities.trace("src/framework/api/server/response/dispatch/html/get_error_file_path.js");
        return this.api.dependencies.path.resolve(__dirname, "../../../../../../../src/www/template/pages/error.html");
    } catch (error) {
        this.api.utilities.error.handle("src/framework/api/server/response/dispatch/html/get_error_file_path.js", error);
    }
};