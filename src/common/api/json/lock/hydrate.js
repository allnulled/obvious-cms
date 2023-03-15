module.exports = async function (file, lock_options_arg, dehydrate_options_arg, callback) {
    try {
        const path = require("path");
        const semlocks = require("semlocks");
        const lock_options_default = { wait: 1000 };
        const dehydrate_options_default = { replacer: null, spaces: 2 };
        const lock_options = Object.assign({}, lock_options_default, lock_options_arg);
        const dehydrate_options = Object.assign({}, dehydrate_options_default, dehydrate_options_arg);
        const file_path = path.resolve(file);
        const file_data = await this.api.json.hydrate(file_path);
        return await new Promise((ok, fail) => {
            semlocks.acquire(file_path, lock_options, async (error, release) => {
                try {
                    if(error) {
                        return fail(error);
                    }
                    const file_data_output = await callback(file_data);
                    if(typeof file_data_output !== "undefined") {
                        await this.api.json.dehydrate(file_path, file_data_output, dehydrate_options.replacer, dehydrate_options.spaces);
                    }
                    release();
                    return ok();
                } catch(error) {
                    this.api.error.handle("src/common/api/json/lock/hydrate.js # semaphore_callback_1", error);
                    release();
                    return fail(error);
                }
            });
        });
    } catch (error) {
        throw error;
    }
};
