module.exports = (file, data = undefined, json_replacer = undefined, json_replacer_parameters = undefined) => {
    return new Promise((ok, fail) => {
        const data_json = JSON.stringify(data, json_replacer, json_replacer_parameters);
        require("fs").writeFile(file, data_json, "utf8", function (error) {
            if (error) {
                return fail(error);
            }
            return ok();
        });
    });
};
