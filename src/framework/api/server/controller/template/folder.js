module.exports = function (template_folder, template_parameters_arg = {}, template_configurations = {}) {
    try {
        this.api.utilities.trace("src/framework/api/server/controller/template/folder.js");
        const router = this.api.dependencies.express.Router();
        router.use(async (request, response, next) => {
            try {
                const { path, fs, url, ejs } = this.api.dependencies;
                const url_path = url.parse(request.url).pathname;
                const template_file = path.resolve(template_folder, url_path.replace("/", ""));
                if (!template_file.startsWith(template_folder)) {
                    throw new Error("Malintentioned file access (via template/folder) detected");
                }
                const template_contents = await fs.promises.readFile(template_file, "utf8");
                const template_parameters_base = { framework: this, request, response, next };
                const template_parameters = Object.assign({}, template_parameters_base, template_parameters_arg);
                const template_page = ejs.render(template_contents, template_parameters, template_configurations);
                const extension_type = path.extname(template_file);
                return response.type(extension_type).send(template_page);
            } catch (error) {
                return next(error);
            }
        });
        return router;
    } catch (error) {
        this.api.utilities.error.handle("src/framework/api/server/controller/template/folder.js", error);
    }
};