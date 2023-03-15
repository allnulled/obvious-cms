module.exports = async function () {
    try {
        this.api.utilities.trace("src/framework/api/server/https/load.js");
        if(process.env.SECURE_SERVER_ENABLED === "yes") {
            const fs = this.api.dependencies.fs;
            this.api.server.https.instance = this.api.dependencies.https.createServer({
                key: fs.readFileSync(__dirname + "/options/private.pem").toString(),
                cert: fs.readFileSync(__dirname + "/options/public.pem").toString()
            }, this.api.server.app.instance);
        }
    } catch (error) {
        this.api.utilities.error.handle("src/framework/api/server/https/load.js", error);
    }
};