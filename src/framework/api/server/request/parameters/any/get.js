module.exports = async function (request, parameter_ids, are_required = true, parse_body_if_needed = true, body_parser_configurations = {}) {
    try {
        this.api.utilities.trace("src/framework/api/server/request/parameters/any/get.js");
        const Check = this.api.dependencies.check;
        Check.that(request).isObject();
        Check.that(parameter_ids).isArray();
        Check.that(are_required).isBoolean();
        Check.that(parse_body_if_needed).isBoolean();
        Check.that(body_parser_configurations).isObject();
        Parse_body_if_not_already: {
            const has_body = typeof request.body === "object";
            if(!has_body) {
                if(parse_body_if_needed) {
                    await this.api.server.middleware.body.parser.as.json(request, undefined, body_parser_configurations);
                }
            }
        }
        const parameters = {};
        const missing_parameters_on_body = [];
        Get_parameters_from_body: {
            if(typeof request.body === "object") {
                for(let index_parameter_id = 0; index_parameter_id < parameter_ids.length; index_parameter_id++) {
                    const parameter_id = parameter_ids[index_parameter_id];
                    if(parameter_id in request.body) {
                        parameters[parameter_id] = request.body[parameter_id];
                    } else {
                        missing_parameters_on_body.push(parameter_id);
                    }
                }
            }
        }
        const missing_parameters_on_querystring_too = [];
        Get_parameters_from_querystring: {
            for (let index_parameter_id = 0; index_parameter_id < missing_parameters_on_body.length; index_parameter_id++) {
                const parameter_id = missing_parameters_on_body[index_parameter_id];
                if (parameter_id in request.query) {
                    parameters[parameter_id] = request.query[parameter_id];
                } else {
                    missing_parameters_on_querystring_too.push(parameter_id);
                }
            }
        }
        Check_missing_parameters: {
            if (are_required) {
                if(missing_parameters_on_querystring_too.length) {
                    throw new Error("Parameters missing (" + missing_parameters_on_querystring_too.map(parameter => `«${parameter}»`).join(",") + ") to «framework.api.server.request.parameters.any.get»");
                }
            }
        }
        return parameters;
    } catch (error) {
        this.api.utilities.error.handle("src/framework/api/server/request/parameters/any/get.js", error, true);
    }
};