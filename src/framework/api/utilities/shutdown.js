module.exports = async function () {
    try {
        this.api.utilities.trace("src/framework/api/utilities/shutdown.js");
        Shutdown_http_server: {
            try {
                if (typeof this.api.server.http.instance !== "string") await this.api.server.http.instance.close();
            } catch (error) {
                console.log("Error on src/framework/api/utilities/shutdown.js:", error);
            }
        }
        Shutdown_https_server: {
            try {
                if (typeof this.api.server.https.instance !== "string") await this.api.server.https.instance.close();
            } catch (error) {
                console.log("Error on src/framework/api/utilities/shutdown.js:", error);
            }
        }
        Shutdown_database_connection: {
            try {
                if (typeof this.api.database.connection !== "string") await this.api.database.connection.end();
            } catch (error) {
                console.log("Error on src/framework/api/utilities/shutdown.js:", error);
            }
        }
        Shutdown_spinners: {
            try {
                await this.api.common.api.cmd.spinner.loader.instance.stopAll();
            } catch (error) {
                console.log("Error on src/framework/api/utilities/shutdown.js:", error);
            }
        }
        Shutdown_semlocks: {
            try {
                const semlocks = this.api.dependencies.semlocks;
                // @TODO: semlocks.getLocks() ... then *.close() all object values
            } catch (error) {
                console.log("Error on src/framework/api/utilities/shutdown.js:", error);
            }
        }
        // @ADD OTHER CLOSABLES here.
    } catch (error) {
        this.api.utilities.error.handle("src/framework/api/utilities/shutdown.js", error);
    }
};