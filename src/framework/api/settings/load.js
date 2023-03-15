module.exports = async function () {
    try {
        this.api.utilities.trace("src/framework/api/settings/load.js");
        const dotenv = require("dotenv");
        const dotenv_expand = require("dotenv-expand");
        const environment = process.env.NODE_ENV || "development";
        process.env.NODE_ENV = environment;
        process.env.CMS_PROJECT_ROOT_PATH = require("path").resolve(__dirname, "../../../..");
        process.env.CMS_PROJECT_SRC_PATH = require("path").resolve(__dirname, "../../..");
        this.api.settings = dotenv.config({ path: `${__dirname}/.env.${environment}` });
        dotenv_expand.expand(this.api.settings);
    } catch (error) {
        this.api.utilities.error.handle("src/framework/api/settings/load.js", error);
    }
};