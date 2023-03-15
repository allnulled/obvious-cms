module.exports = async function () {
    try {
        this.api.utilities.trace("src/framework/api/server/start.js");
        await new Promise((ok) => { this.api.server.http.instance.listen(process.env.SERVER_PORT, ok) });
        this.api.utilities.trace(`✓ Server started on:\n  http://${ process.env.SERVER_HOST }:${ process.env.SERVER_PORT }`);
        if (process.env.SECURE_SERVER_ENABLED === "yes") {
            await new Promise((ok) => { this.api.server.https.instance.listen(process.env.SECURE_SERVER_PORT, ok) });
            this.api.utilities.trace(`✓ Secure server started on:\n  https://${ process.env.SECURE_SERVER_HOST }:${ process.env.SECURE_SERVER_PORT }`);
        } else {
            this.api.utilities.trace("Secure server (https) is disabled.");
        }
        return this;
    } catch (error) {
        this.api.utilities.error.handle("src/framework/api/server/start.js", error);
    }
};