module.exports = function (folder_path, folder_configurations = {}) {
    try {
        this.api.utilities.trace("src/framework/api/server/controller/static/folder.js");
        return this.api.dependencies.express.static(folder_path, folder_configurations);
    } catch (error) {
        this.api.utilities.error.handle("src/framework/api/server/controller/static/folder.js", error);
    }
};