module.exports = function (json_file, configurations_arg = {}) {
    try {
        this.api.utilities.trace("src/framework/api/server/controller/storage/by/json/file.js");
        const available_actions = [
            "get",
            "set",
            "append",
            "prepend",
            "insert_before",
            "insert_after",
            "delete_property",
            "delete_item",
            "expand",
            "increase",
            "decrease",
        ];
        const configurations_default = {
            allowed_actions: available_actions,
            pre_handler: all_parameters => {
                // @TOFILL: simply throw new Error(xxx) when the request should NOT be accepted
            },
            post_handler: data => data,
            handler: async function (all_parameters) {
                const { request, response, next, configurations } = all_parameters;
                try {
                    await this.api.server.middleware.body.parser.as.json(request, response, { limit: "100kb" });
                    if (typeof request.body !== "object") {
                        throw new Error("Request body must be a JSON object and request header 'Content-Type' must be 'application/json' to operate with the JSON storage via HTTP");
                    }
                    if (available_actions.indexOf(request.body.action) === -1) {
                        throw new Error("Request body must contain a valid 'action' to operate with the JSON storage via HTTP");
                    }
                    if (configurations_default.allowed_actions.indexOf(request.body.action) === -1) {
                        throw new Error(`Request body must contain an allowed 'action' (while ${request.body.action} is NOT) to operate with the JSON storage via HTTP`);
                    }
                    await configurations.pre_handler(all_parameters);
                    const result_brute = await configurations[request.body.action].call(this, all_parameters);
                    const result = configurations.post_handler(result_brute, all_parameters);
                    return this.api.server.response.dispatch.json.success(response, result);
                } catch (error) {
                    error.show_as_json = true;
                    return next(error);
                }
            },
            get: async function (all_parameters) {
                const { file, request, response, next, configurations } = all_parameters;
                try {
                    const selector = request.body.selector;
                    const file_data = await this.api.common.api.json.hydrate(file);
                    let selected_data = file_data;
                    Reducir_seleccion: {
                        let output = file_data;
                        if (typeof selector === "undefined") {
                            break Reducir_seleccion;
                        }
                        if (!Array.isArray(selector)) {
                            throw new Error("Parameter 'selector' must be an array (or ignored) to operate (get) with the JSON storage via HTTP")
                        }
                        if (selector.length === 0) {
                            break Reducir_seleccion;
                        }
                        try {
                            for (let index_property = 0; index_property < selector.length; index_property++) {
                                const selector_property = selector[index_property];
                                output = output[selector_property];
                            }
                        } catch (error) {
                            output = null;
                        }
                        selected_data = output;
                    }
                    return {
                        message: "Operation 'get' on JSON storage successfully committed",
                        selection: selected_data
                    };
                } catch (error) {
                    throw error;
                }
            },
            set: async function (all_parameters) {
                const { file, request, response, next, configurations } = all_parameters;
                try {
                    let selector = request.body.selector;
                    const value = request.body.value;
                    await this.api.common.api.json.lock.hydrate(file, {}, {}, async (file_data) => {
                        try {
                            Operar_sobre_seleccion: {
                                let pivotal_item = file_data;
                                if (typeof selector === "undefined") {
                                    throw new Error("Parameter 'selector' must be an array to operate (set) with the JSON storage via HTTP")
                                }
                                if (!Array.isArray(selector)) {
                                    throw new Error("Parameter 'selector' must be an array to operate (set) with the JSON storage via HTTP")
                                }
                                if (selector.length === 0) {
                                    file_data = value;
                                } else {
                                    const last_position = selector.length - 1;
                                    for (let index_property = 0; index_property < selector.length; index_property++) {
                                        const selector_property = selector[index_property];
                                        if (index_property === last_position) {
                                            pivotal_item[selector_property] = value;
                                        } else {
                                            const selector_property = selector[index_property];
                                            pivotal_item = pivotal_item[selector_property];
                                        }
                                    }
                                }
                            }
                            Operar_sobre_el_fichero: {
                                await this.api.common.api.json.dehydrate(file, file_data, null, 2);
                            }
                        } catch (error) {
                            throw error;
                        }
                    });
                    return {
                        message: "Operation 'set' on JSON storage successfully committed",
                    };
                } catch (error) {
                    throw error;
                }
            },
            append: async function (all_parameters) {
                const { file, request, response, next, configurations } = all_parameters;
                try {
                    let selector = request.body.selector;
                    const value = request.body.value;
                    await this.api.common.api.json.lock.hydrate(file, {}, {}, async (file_data) => {
                        try {
                            Operar_sobre_seleccion: {
                                let pivotal_item = file_data;
                                if (typeof selector === "undefined") {
                                    throw new Error("Parameter 'selector' must be an array to operate (append) with the JSON storage via HTTP")
                                }
                                if (!Array.isArray(selector)) {
                                    throw new Error("Parameter 'selector' must be an array to operate (append) with the JSON storage via HTTP")
                                }
                                if (selector.length === 0) {
                                    if (!Array.isArray(pivotal_item)) {
                                        throw new Error("Parameter 'selector' must point to an array to operate (append) with the JSON storage via HTTP");
                                    }
                                    pivotal_item.push(value);
                                } else {
                                    const last_position = selector.length - 1;
                                    for (let index_property = 0; index_property < selector.length; index_property++) {
                                        const selector_property = selector[index_property];
                                        if (index_property === last_position) {
                                            if (!Array.isArray(pivotal_item[selector_property])) {
                                                throw new Error("Parameter 'selector' must point to an array to operate (append) with the JSON storage via HTTP");
                                            }
                                            pivotal_item[selector_property].push(value);
                                        } else {
                                            const selector_property = selector[index_property];
                                            pivotal_item = pivotal_item[selector_property];
                                        }
                                    }
                                }
                            }
                            Operar_sobre_el_fichero: {
                                await this.api.common.api.json.dehydrate(file, file_data, null, 2);
                            }
                        } catch (error) {
                            throw error;
                        }
                    });
                    return {
                        message: "Operation 'append' on JSON storage successfully committed",
                    };
                } catch (error) {
                    throw error;
                }
            },
            prepend: async function (all_parameters) {
                const { file, request, response, next, configurations } = all_parameters;
                try {
                    let selector = request.body.selector;
                    const value = request.body.value;
                    await this.api.common.api.json.lock.hydrate(file, {}, {}, async (file_data) => {
                        try {
                            Operar_sobre_seleccion: {
                                let pivotal_item = file_data;
                                if (typeof selector === "undefined") {
                                    throw new Error("Parameter 'selector' must be an array to operate (prepend) with the JSON storage via HTTP")
                                }
                                if (!Array.isArray(selector)) {
                                    throw new Error("Parameter 'selector' must be an array to operate (prepend) with the JSON storage via HTTP")
                                }
                                if (selector.length === 0) {
                                    if (!Array.isArray(pivotal_item)) {
                                        throw new Error("Parameter 'selector' must point to an array to operate (prepend) with the JSON storage via HTTP");
                                    }
                                    pivotal_item.unshift(value);
                                } else {
                                    const last_position = selector.length - 1;
                                    for (let index_property = 0; index_property < selector.length; index_property++) {
                                        const selector_property = selector[index_property];
                                        if (index_property === last_position) {
                                            if (!Array.isArray(pivotal_item[selector_property])) {
                                                throw new Error("Parameter 'selector' must point to an array to operate (prepend) with the JSON storage via HTTP");
                                            }
                                            pivotal_item[selector_property].unshift(value);
                                        } else {
                                            const selector_property = selector[index_property];
                                            pivotal_item = pivotal_item[selector_property];
                                        }
                                    }
                                }
                            }
                            Operar_sobre_el_fichero: {
                                await this.api.common.api.json.dehydrate(file, file_data, null, 2);
                            }
                        } catch (error) {
                            throw error;
                        }
                    });
                    return {
                        message: "Operation 'prepend' on JSON storage successfully committed",
                    };
                } catch (error) {
                    throw error;
                }
            },
            insert_before: async function (all_parameters) {
                const { file, request, response, next, configurations } = all_parameters;
                try {
                    let selector = request.body.selector;
                    const value = request.body.value;
                    await this.api.common.api.json.lock.hydrate(file, {}, {}, async (file_data) => {
                        try {
                            Operar_sobre_seleccion: {
                                let pivotal_item = file_data;
                                if (typeof selector === "undefined") {
                                    throw new Error("Parameter 'selector' must be an array to operate (insert_before) with the JSON storage via HTTP")
                                }
                                if (!Array.isArray(selector)) {
                                    throw new Error("Parameter 'selector' must be an array to operate (insert_before) with the JSON storage via HTTP")
                                }
                                if (selector.length === 0) {
                                    if (!Array.isArray(pivotal_item)) {
                                        throw new Error("Parameter 'selector' must point to an element of an array to operate (insert_before) with the JSON storage via HTTP");
                                    }
                                } else {
                                    const last_position = selector.length - 1;
                                    for (let index_property = 0; index_property < selector.length; index_property++) {
                                        const selector_property = selector[index_property];
                                        if (index_property === last_position) {
                                            if (!Array.isArray(pivotal_item)) {
                                                throw new Error("Parameter 'selector' must point to an element of an array to operate (insert_before) with the JSON storage via HTTP");
                                            }
                                            pivotal_item.splice(parseInt(selector_property), 0, value);
                                        } else {
                                            const selector_property = selector[index_property];
                                            pivotal_item = pivotal_item[selector_property];
                                        }
                                    }
                                }
                            }
                            Operar_sobre_el_fichero: {
                                await this.api.common.api.json.dehydrate(file, file_data, null, 2);
                            }
                        } catch (error) {
                            throw error;
                        }
                    });
                    return {
                        message: "Operation 'insert_before' on JSON storage successfully committed",
                    };
                } catch (error) {
                    throw error;
                }
            },
            insert_after: async function (all_parameters) {
                const { file, request, response, next, configurations } = all_parameters;
                try {
                    let selector = request.body.selector;
                    const value = request.body.value;
                    await this.api.common.api.json.lock.hydrate(file, {}, {}, async (file_data) => {
                        try {
                            Operar_sobre_seleccion: {
                                let pivotal_item = file_data;
                                if (typeof selector === "undefined") {
                                    throw new Error("Parameter 'selector' must be an array to operate (insert_after) with the JSON storage via HTTP")
                                }
                                if (!Array.isArray(selector)) {
                                    throw new Error("Parameter 'selector' must be an array to operate (insert_after) with the JSON storage via HTTP")
                                }
                                if (selector.length === 0) {
                                    if (!Array.isArray(pivotal_item)) {
                                        throw new Error("Parameter 'selector' must point to an element of an array to operate (insert_after) with the JSON storage via HTTP");
                                    }
                                } else {
                                    const last_position = selector.length - 1;
                                    for (let index_property = 0; index_property < selector.length; index_property++) {
                                        const selector_property = selector[index_property];
                                        if (index_property === last_position) {
                                            if (!Array.isArray(pivotal_item)) {
                                                throw new Error("Parameter 'selector' must point to an element of an array to operate (insert_after) with the JSON storage via HTTP");
                                            }
                                            pivotal_item.splice(parseInt(selector_property) + 1, 0, value);
                                        } else {
                                            const selector_property = selector[index_property];
                                            pivotal_item = pivotal_item[selector_property];
                                        }
                                    }
                                }
                            }
                            Operar_sobre_el_fichero: {
                                await this.api.common.api.json.dehydrate(file, file_data, null, 2);
                            }
                        } catch (error) {
                            throw error;
                        }
                    });
                    return {
                        message: "Operation 'insert_after' on JSON storage successfully committed",
                    };
                } catch (error) {
                    throw error;
                }
            },
            delete_property: async function (all_parameters) {
                const { file, request, response, next, configurations } = all_parameters;
                try {
                    let selector = request.body.selector;
                    await this.api.common.api.json.lock.hydrate(file, {}, {}, async (file_data) => {
                        try {
                            Operar_sobre_seleccion: {
                                let pivotal_item = file_data;
                                if (typeof selector === "undefined") {
                                    throw new Error("Parameter 'selector' must be an array to operate (delete_property) with the JSON storage via HTTP")
                                }
                                if (!Array.isArray(selector)) {
                                    throw new Error("Parameter 'selector' must be an array to operate (delete_property) with the JSON storage via HTTP")
                                }
                                if (selector.length === 0) {
                                    if (!Array.isArray(pivotal_item)) {
                                        throw new Error("Parameter 'selector' must point to an element of an object to operate (delete_property) with the JSON storage via HTTP");
                                    }
                                } else {
                                    const last_position = selector.length - 1;
                                    for (let index_property = 0; index_property < selector.length; index_property++) {
                                        const selector_property = selector[index_property];
                                        if (index_property === last_position) {
                                            if (typeof pivotal_item !== "object") {
                                                throw new Error("Parameter 'selector' must point to an element of an object to operate (delete_property) with the JSON storage via HTTP");
                                            }
                                            if (!(selector_property in pivotal_item)) {
                                                throw new Error("Parameter 'selector' must point to an existing element of an object to operate (delete_property) with the JSON storage via HTTP");
                                            }
                                            delete pivotal_item[selector_property];
                                        } else {
                                            const selector_property = selector[index_property];
                                            pivotal_item = pivotal_item[selector_property];
                                        }
                                    }
                                }
                            }
                            Operar_sobre_el_fichero: {
                                await this.api.common.api.json.dehydrate(file, file_data, null, 2);
                            }
                        } catch (error) {
                            throw error;
                        }
                    });
                    return {
                        message: "Operation 'delete_property' on JSON storage successfully committed",
                    };
                } catch (error) {
                    throw error;
                }
            },
            delete_item: async function (all_parameters) {
                const { file, request, response, next, configurations } = all_parameters;
                try {
                    let selector = request.body.selector;
                    await this.api.common.api.json.lock.hydrate(file, {}, {}, async (file_data) => {
                        try {
                            Operar_sobre_seleccion: {
                                let pivotal_item = file_data;
                                if (typeof selector === "undefined") {
                                    throw new Error("Parameter 'selector' must be an array to operate (delete_item) with the JSON storage via HTTP")
                                }
                                if (!Array.isArray(selector)) {
                                    throw new Error("Parameter 'selector' must be an array to operate (delete_item) with the JSON storage via HTTP")
                                }
                                if (selector.length === 0) {
                                    if (!Array.isArray(pivotal_item)) {
                                        throw new Error("Parameter 'selector' must point to an element of an array to operate (delete_item) with the JSON storage via HTTP");
                                    }
                                } else {
                                    const last_position = selector.length - 1;
                                    for (let index_property = 0; index_property < selector.length; index_property++) {
                                        const selector_property = selector[index_property];
                                        if (index_property === last_position) {
                                            if (!Array.isArray(pivotal_item)) {
                                                throw new Error("Parameter 'selector' must point to an element of an array to operate (delete_item) with the JSON storage via HTTP");
                                            }
                                            pivotal_item.splice(parseInt(selector_property), 1, value);
                                        } else {
                                            const selector_property = selector[index_property];
                                            pivotal_item = pivotal_item[selector_property];
                                        }
                                    }
                                }
                            }
                            Operar_sobre_el_fichero: {
                                await this.api.common.api.json.dehydrate(file, file_data, null, 2);
                            }
                        } catch (error) {
                            throw error;
                        }
                    });
                    return {
                        message: "Operation 'delete_item' on JSON storage successfully committed",
                    };
                } catch (error) {
                    throw error;
                }
            },
            expand: async function (all_parameters) {
                const { file, request, response, next, configurations } = all_parameters;
                try {
                    let selector = request.body.selector;
                    const value = request.body.value;
                    await this.api.common.api.json.lock.hydrate(file, {}, {}, async (file_data) => {
                        try {
                            Operar_sobre_seleccion: {
                                let pivotal_item = file_data;
                                if (typeof selector === "undefined") {
                                    throw new Error("Parameter 'selector' must be an array to operate (expand) with the JSON storage via HTTP")
                                }
                                if (!Array.isArray(selector)) {
                                    throw new Error("Parameter 'selector' must be an array to operate (expand) with the JSON storage via HTTP")
                                }
                                if (typeof value !== "object") {
                                    throw new Error("Parameter 'value' must be an object to operate (expand) with the JSON storage via HTTP")
                                }
                                if (selector.length === 0) {
                                    if (typeof pivotal_item !== "object") {
                                        throw new Error("Parameter 'selector' must point to an object to operate (expand) with the JSON storage via HTTP");
                                    }
                                    pivotal_item = Object.assign(pivotal_item, value);
                                } else {
                                    const last_position = selector.length - 1;
                                    for (let index_property = 0; index_property < selector.length; index_property++) {
                                        const selector_property = selector[index_property];
                                        if (index_property === last_position) {
                                            if (typeof pivotal_item[selector_property] === "object") {
                                                throw new Error("Parameter 'selector' must point to an object to operate (expand) with the JSON storage via HTTP");
                                            }
                                            pivotal_item[selector_property] = Object.assign(pivotal_item[selector_property], value);
                                        } else {
                                            const selector_property = selector[index_property];
                                            pivotal_item = pivotal_item[selector_property];
                                        }
                                    }
                                }
                            }
                            Operar_sobre_el_fichero: {
                                await this.api.common.api.json.dehydrate(file, file_data, null, 2);
                            }
                        } catch (error) {
                            throw error;
                        }
                    });
                    return {
                        message: "Operation 'expand' on JSON storage successfully committed",
                    };
                } catch (error) {
                    throw error;
                }
            },
            increase: async function (all_parameters) {
                const { file, request, response, next, configurations } = all_parameters;
                try {
                    let selector = request.body.selector;
                    await this.api.common.api.json.lock.hydrate(file, {}, {}, async (file_data) => {
                        try {
                            Operar_sobre_seleccion: {
                                let pivotal_item = file_data;
                                if (typeof selector === "undefined") {
                                    throw new Error("Parameter 'selector' must be an array to operate (increase) with the JSON storage via HTTP")
                                }
                                if (!Array.isArray(selector)) {
                                    throw new Error("Parameter 'selector' must be an array to operate (increase) with the JSON storage via HTTP")
                                }
                                if (selector.length === 0) {
                                    if (typeof pivotal_item !== "number") {
                                        throw new Error("Parameter 'selector' must point to a number to operate (increase) with the JSON storage via HTTP");
                                    }
                                    pivotal_item++;
                                } else {
                                    const last_position = selector.length - 1;
                                    for (let index_property = 0; index_property < selector.length; index_property++) {
                                        const selector_property = selector[index_property];
                                        if (index_property === last_position) {
                                            if (!Array.isArray(pivotal_item)) {
                                                throw new Error("Parameter 'selector' must point to a number to operate (increase) with the JSON storage via HTTP");
                                            }
                                            pivotal_item[selector_property]++;
                                        } else {
                                            const selector_property = selector[index_property];
                                            pivotal_item = pivotal_item[selector_property];
                                        }
                                    }
                                }
                            }
                            Operar_sobre_el_fichero: {
                                await this.api.common.api.json.dehydrate(file, file_data, null, 2);
                            }
                        } catch (error) {
                            throw error;
                        }
                    });
                    return {
                        message: "Operation 'increase' on JSON storage successfully committed",
                    };
                } catch (error) {
                    console.log(error);
                    throw error;
                }
            },
            decrease: async function (all_parameters) {
                const { file, request, response, next, configurations } = all_parameters;
                try {
                    let selector = request.body.selector;
                    await this.api.common.api.json.lock.hydrate(file, {}, {}, async (file_data) => {
                        try {
                            Operar_sobre_seleccion: {
                                let pivotal_item = file_data;
                                if (typeof selector === "undefined") {
                                    throw new Error("Parameter 'selector' must be an array to operate (decrease) with the JSON storage via HTTP")
                                }
                                if (!Array.isArray(selector)) {
                                    throw new Error("Parameter 'selector' must be an array to operate (decrease) with the JSON storage via HTTP")
                                }
                                if (selector.length === 0) {
                                    if (typeof pivotal_item !== "number") {
                                        throw new Error("Parameter 'selector' must point to a number to operate (decrease) with the JSON storage via HTTP");
                                    }
                                    pivotal_item--;
                                } else {
                                    const last_position = selector.length - 1;
                                    for (let index_property = 0; index_property < selector.length; index_property++) {
                                        const selector_property = selector[index_property];
                                        if (index_property === last_position) {
                                            if (!Array.isArray(pivotal_item)) {
                                                throw new Error("Parameter 'selector' must point to a number to operate (decrease) with the JSON storage via HTTP");
                                            }
                                            pivotal_item[selector_property]--;
                                        } else {
                                            const selector_property = selector[index_property];
                                            pivotal_item = pivotal_item[selector_property];
                                        }
                                    }
                                }
                            }
                            Operar_sobre_el_fichero: {
                                await this.api.common.api.json.dehydrate(file, file_data, null, 2);
                            }
                        } catch (error) {
                            throw error;
                        }
                    });
                    return {
                        message: "Operation 'decrease' on JSON storage successfully committed",
                    };
                } catch (error) {
                    throw error;
                }
            },
        };
        const configurations = Object.assign({}, configurations_default, configurations_arg);
        return (request, response, next) => {
            try {
                const parameters = { framework: this, file: json_file, configurations, request, response, next };
                return configurations.handler.call(this, parameters);
            } catch (error) {
                return next(error);
            }
        };
    } catch (error) {
        this.api.utilities.error.handle("src/framework/api/server/controller/storage/by/json/file.js", error);
    }
};