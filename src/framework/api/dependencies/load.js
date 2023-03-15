module.exports = async function () {
    try {
        this.api.utilities.trace("src/framework/api/dependencies/load.js");
        Object.assign(this.api.dependencies, {
            fs: require("fs"),
            path: require("path"),
            check: require("@allnulled/check-that"),
            url: require("url"),
            os: require("os"),
            http: require("http"),
            https: require("https"),
            body_parser: require("body-parser"),
            chalk: require("chalk"),
            cleesy: require("cleesy"),
            cors: require("cors"),
            dotenv: require("dotenv"),
            dotenv_expand: require("dotenv-expand"),
            ejs: require("ejs"),
            express: require("express"),
            glob: require("glob"),
            javadoc: require("javadoc"),
            multer: require("multer"),
            mysql2: require("mysql2"),
            mysql2promise: require("mysql2/promise"),
            semlocks: require("semlocks"),
            socket_io: require("socket.io"),
            spinnies: require("spinnies"),
            yargs: require("yargs"),
            noop: function() {},
        });
    } catch (error) {
        this.api.utilities.error.handle("src/framework/api/dependencies/load.js", error);
    }
};