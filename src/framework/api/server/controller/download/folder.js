module.exports = function (download_folder, download_configurations = {}) {
    try {
        this.api.utilities.trace("src/framework/api/server/controller/download/folder.js");
        const router = this.api.dependencies.express.Router();
        router.use(async (request, response, next) => {
            try {
                const { path, url } = this.api.dependencies;
                const url_path = url.parse(request.url).pathname;
                const download_file = path.resolve(download_folder, url_path.replace("/", ""));
                if (!download_file.startsWith(download_folder)) {
                    throw new Error("Malintentioned file access (via download/folder) detected");
                }
                return response.download(download_file, download_configurations);
            } catch (error) {
                return next(error);
            }
        });
        return router;
    } catch (error) {
        this.api.utilities.error.handle("src/framework/api/server/controller/download/folder.js", error);
    }
};