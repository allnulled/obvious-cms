module.exports = (file, default_value = undefined) => {
    return new Promise((ok, fail) => {
        require("fs").readFile(file, "utf8", (error, data_json) => {
            if(error) {
                if(typeof default_value === "undefined") {
                    return fail(error);
                }
                data_json = default_value;
            }
            try {
                const data = JSON.parse(data_json);
                return ok(data);
            } catch(error) {
                this.api.log.error(new Error("JSON file is corrupted on: " + file));
                if (typeof default_value === "undefined") {
                    return fail(error);
                }
            }
        });
    });
};
