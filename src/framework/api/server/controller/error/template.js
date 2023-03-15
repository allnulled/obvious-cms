module.exports = function (template_path = false, template_parameters_arg = {}, template_configurations = {}) {
    try {
        this.api.utilities.trace("src/framework/api/server/controller/error/template.js");
        return async (error, request, response, next) => {
            try {
                this.api.utilities.error.handle("src/framework/api/server/controller/error/template.js", error);
                if(error.show_as_json === true) {
                    return this.api.server.response.dispatch.json.error(response, error);
                }
                const { path, fs, ejs } = this.api.dependencies;
                const template_file = path.resolve(template_path || this.api.server.response.dispatch.html.get_error_file_path());
                const template_contents = await fs.promises.readFile(template_file, "utf8");
                const template_parameters_base = { framework: this, request, response, next, error };
                const template_parameters = Object.assign({}, template_parameters_base, template_parameters_arg);
                const template_page = ejs.render(template_contents, template_parameters, template_configurations);
                const extension_type = path.extname(template_file);
                return response.type(extension_type).send(template_page);
            } catch (error) {
                return next(error);
            }
        }
    } catch (error) {
        this.api.utilities.error.handle("src/framework/api/server/controller/error/template.js", error);
    }
};