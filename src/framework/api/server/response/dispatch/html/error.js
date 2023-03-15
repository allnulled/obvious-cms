module.exports = async function (response, error, metadata = {}, code = 200, template_parameters_arg = {}, request = undefined) {
    try {
        this.api.utilities.trace("src/framework/api/server/response/dispatch/html/error.js");
        try {
            this.api.server.log.error(error, {}, response.req, response);
            const { fs, ejs } = this.api.dependencies;
            const template_file = this.api.server.response.dispatch.html.get_error_file_path();
            const template_contents = await fs.promises.readFile(template_file, "utf8");
            const template_parameters_base = { error, metadata, code, request, response };
            const template_parameters = Object.assign({}, template_parameters_base, template_parameters_arg);
            const template_page = ejs.render(template_contents, template_parameters, template_configs);
            return response.type("html").send(template_page);
        } catch (error) {
            return response.type("json").status(500).json({ error });
        }
    } catch (error) {
        this.api.utilities.error.handle("src/framework/api/server/response/dispatch/html/error.js", error);
    }
};