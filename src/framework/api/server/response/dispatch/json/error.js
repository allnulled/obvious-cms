module.exports = function (response, error, metadata = {}, code = 500) {
    try {
        this.api.utilities.trace("src/framework/api/server/response/dispatch/json/error.js");
        const base_factory = require(__dirname + "/base.js");
        const base = base_factory();
        const response_object = Object.assign({}, base, {
            error: error instanceof Error ? (() => {
                try {
                    if(process.env.NODE_ENV !== "production") {
                        return {
                            name: error.name,
                            message: error.message,
                            stack: error.stack.split(/\n    (?=at)/g).map(stack_trace => {
                                const [ $function, $file ] = stack_trace.split(/ (?=\()/g);
                                return { "0": $function, "1": $file };
                            })
                        };
                    } else {
                        return {
                            name: error.name,
                            message: error.message,
                        };
                    }
                } catch (suberror) {
                    return error;
                }
             })() : error
        }, metadata);
        return response.status(code).json(response_object);
    } catch (error) {
        this.api.utilities.error.handle("src/framework/api/server/response/dispatch/json/error.js", error);
    }
};