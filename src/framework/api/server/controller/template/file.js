module.exports = function (template_path, template_parameters_arg = {}, template_configurations = {}) {
    try {
        this.api.utilities.trace("src/framework/api/server/controller/template/file.js");
        return async (request, response, next) => {
            try {
                const { path, fs, ejs } = this.api.dependencies;
                const template_file = path.resolve(template_path);
                const template_contents = await fs.promises.readFile(template_file, "utf8");
                const template_parameters_base = { framework: this, request, response, next };
                const template_parameters = Object.assign({}, template_parameters_base, template_parameters_arg);
                const template_page = ejs.render(template_contents, template_parameters, template_configurations);
                const extension_type = path.extname(template_file);
                return response.type(extension_type).send(template_page);
            } catch (error) {
                return next(error);
            }
        }
    } catch (error) {
        this.api.utilities.error.handle("src/framework/api/server/controller/template/file.js", error);
    }
};